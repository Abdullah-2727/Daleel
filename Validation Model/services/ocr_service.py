import os
import re
import time
import numpy as np
import cv2
import requests
from ultralytics import YOLO
from typing import Dict, Optional
from config import settings

# ── Pytesseract setup ─────────────────────────────────────────────────────────
try:
    import pytesseract
    from PIL import Image as _PILImage, ImageDraw as _ImageDraw, ImageFont as _ImageFont

    import platform, shutil as _shutil
    if platform.system() == "Windows" and not _shutil.which("tesseract"):
        for _p in [
            r"C:\Program Files\Tesseract-OCR\tesseract.exe",
            r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
            os.path.expanduser(r"~\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"),
        ]:
            if os.path.isfile(_p):
                pytesseract.pytesseract.tesseract_cmd = _p
                print(f"[TESS] binary -> {_p}")
                break

    pytesseract.get_tesseract_version()
    _TESS_OK  = True
    _TESS_ARA = "ara" in pytesseract.get_languages()
    print(f"[TESS] ready | ara={_TESS_ARA}")
except Exception as _e:
    _TESS_OK  = False
    _TESS_ARA = False
    print(f"[TESS] unavailable: {_e}")

_model_cache: Dict[str, YOLO] = {}

_ARABIC_INDIC = str.maketrans(
    "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669",
    "0123456789"
)

_NUMBER_LABELS = {"ID-Number", "Birth-Date", "expiry_date"}


# ── Egyptian National ID structural validation ────────────────────────────────

_VALID_GOVERNORATES = {
    "01", "02", "03", "04",
    "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "21", "22", "23", "24", "25", "26", "27", "28", "29",
    "31", "32", "33", "34", "35",
    "88",
}


def _score_egyptian_id(digits: str) -> float:
    """Score structural validity of a 14-digit Egyptian National ID (0.0-1.0)."""
    if len(digits) != 14:
        return 0.0
    score = 0.0
    # Century digit
    if digits[0] in ("2", "3"):
        score += 0.2
    # Valid month (01-12)
    try:
        m = int(digits[3:5])
        if 1 <= m <= 12:
            score += 0.25
    except ValueError:
        pass
    # Valid day (01-31)
    try:
        d = int(digits[5:7])
        if 1 <= d <= 31:
            score += 0.25
    except ValueError:
        pass
    # Valid governorate code
    if digits[7:9] in _VALID_GOVERNORATES:
        score += 0.2
    # Year plausibility
    try:
        century = "19" if digits[0] == "2" else "20"
        year = int(century + digits[1:3])
        if 1940 <= year <= 2025:
            score += 0.1
    except ValueError:
        pass
    return score


def _consensus_vote(candidates: list, length: int) -> str:
    """
    Given a list of digit strings (all same length), build a consensus
    string by picking the most frequent digit at each position.
    """
    if not candidates:
        return ""
    result = []
    for pos in range(length):
        counts = {}
        for cand in candidates:
            if pos < len(cand):
                d = cand[pos]
                counts[d] = counts.get(d, 0) + 1
        if counts:
            best = max(counts, key=counts.get)
            result.append(best)
        else:
            result.append("0")
    return "".join(result)


# ── Arabic Text Normalisation ────────────────────────────────────────────────

def normalize_arabic_text(text: str) -> str:
    """
    Normalize Arabic text variants to canonical forms for consistent matching.
    - ى (U+0649 Alif Maksura) → ي (U+064A Ya)
    - أ (U+0623 Alif with Hamza above) → ا (U+0627 Alif)
    - إ (U+0625 Alif with Hamza below) → ا (U+0627 Alif)
    - Removes diacritical marks (Fatha, Damma, Kasra, Shadda, etc.)
    """
    # Step 1: Replace variant letters with canonical forms
    # Alif Maksura → Ya
    text = text.replace('ى', 'ي')
    # Alif with Hamza variants → Alif
    text = text.replace('أ', 'ا')
    text = text.replace('إ', 'ا')
    
    # Step 2: Remove diacritical marks (Tashkeel)
    # Common diacritics: Fatha, Damma, Kasra, Sukun, Tanwin, Shadda, etc.
    diacritics = '\\u064B\\u064C\\u064D\\u064E\\u064F\\u0650\\u0651\\u0652\\u0653\\u0654\\u0655\\u0656'
    for diacritic in diacritics:
        text = text.replace(diacritic, '')
    
    return text


def normalize_text(text: str, label: str = "") -> str:
    text = text.translate(_ARABIC_INDIC)
    text = " ".join(text.split())

    if label == "ID-Number":
        return "".join(c for c in text if c.isdigit())

    if label in ("Birth-Date", "expiry_date"):
        digits = "".join(c for c in text if c.isdigit())
        if len(digits) >= 8:
            for start in range(len(digits) - 7):
                cand = digits[start:start + 8]
                if cand[:2] in ("19", "20"):
                    return f"{cand[:4]}-{cand[4:6]}-{cand[6:8]}"   # YYYY-MM-DD
        return digits

    if label == "Address":
        lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
        return " | ".join(lines) if lines else text
    
    # For text labels (Name, etc.), also normalize Arabic letter variants
    if label in ("Name",):
        text = normalize_arabic_text(text)

    return text


# ── Birth date from Egyptian National ID ─────────────────────────────────────

def _derive_birthdate_from_id(national_id: str) -> tuple:
    """
    Egyptian National ID layout (14 digits):
      [0]    Century: 2 = 19xx   3 = 20xx
      [1-2]  YY   [3-4] MM   [5-6] DD
      [7-8]  Governorate   [9-12] Sequence   [13] Check digit

    Returns (YYYY-MM-DD, confidence_score) or ('', 0.0) on failure.
    Confidence is based on date validity and ID structural integrity.
    """
    digits = "".join(c for c in national_id if c.isdigit())
    if len(digits) != 14:
        print(f"[ID->DOB] need 14 digits, got {len(digits)} — skip")
        return "", 0.0

    code = digits[0]
    if code not in ("2", "3"):
        try:
            year_val = int(digits[1:3])
            code = "2" if year_val > 25 else "3"
        except ValueError:
            return "", 0.0

    century_map  = {"2": "19", "3": "20"}
    year  = century_map[code] + digits[1:3]
    month = digits[3:5]
    day   = digits[5:7]

    try:
        from datetime import date
        
        m_int = int(month)
        d_int = int(day)
        
        # Robust parsing for OCR errors in month/day
        if not (1 <= m_int <= 12):
            print(f"[ID->DOB] invalid month {month}, correcting to 01")
            m_int = 1
        if not (1 <= d_int <= 31):
            print(f"[ID->DOB] invalid day {day}, correcting to 01")
            d_int = 1
            
        dob = date(int(year), m_int, d_int)
        if not (1900 <= dob.year <= 2025):
            raise ValueError("year out of range")
        result = f"{dob.year}-{dob.month:02d}-{dob.day:02d}"
        # Confidence: 0.9 if all extracted values valid, 0.75 if corrected
        confidence = 0.9 if (int(month) == m_int and int(day) == d_int) else 0.75
        print(f"[ID->DOB] derived: {result} (confidence={confidence:.2f})")
        return result, confidence
    except (ValueError, TypeError) as e:
        print(f"[ID->DOB] invalid date {year}-{month}-{day}: {e}")
        return "", 0.0


# ── Model helpers ─────────────────────────────────────────────────────────────

def get_model(name: str = None) -> YOLO:
    name = name or settings.MODEL_NAME
    path = os.path.join(settings.MODEL_DIR, name)
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model {name!r} not found in {settings.MODEL_DIR}")
    if name not in _model_cache:
        _model_cache[name] = YOLO(path)
    return _model_cache[name]


def clear_cache(name: str = None):
    if name:
        _model_cache.pop(name, None)
    else:
        _model_cache.clear()


def list_saved_models():
    out = []
    for fn in os.listdir(settings.MODEL_DIR):
        if fn.endswith(".pt"):
            p = os.path.join(settings.MODEL_DIR, fn)
            s = os.stat(p)
            out.append({"name": fn, "size_mb": round(s.st_size / 1_048_576, 2),
                        "cached": fn in _model_cache, "modified_at": int(s.st_mtime)})
    return out


# ── Preprocessing ─────────────────────────────────────────────────────────────

def _make_preprocessings(img_bgr: np.ndarray, label: str) -> list:
    """
    Upscale once then return 5 grayscale variants covering different
    contrast/binarisation approaches so Tesseract has the best chance.
    """
    h, w   = img_bgr.shape[:2]
    target = 2400 if label == "ID-Number" else 1100
    scale  = max(min(target / max(w, 1), 6.0), 1.0)
    if scale > 1.05:
        img_bgr = cv2.resize(img_bgr, None, fx=scale, fy=scale,
                             interpolation=cv2.INTER_CUBIC)

    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

    # CLAHE base
    clahe      = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8))
    gray_clahe = clahe.apply(gray)

    def _ensure_light_bg(img_g):
        return cv2.bitwise_not(img_g) if np.mean(img_g) < 127 else img_g

    # v1: raw
    v1 = gray.copy()

    # v2: CLAHE
    v2 = gray_clahe.copy()

    # v3: Otsu on CLAHE
    blur3      = cv2.GaussianBlur(gray_clahe, (3, 3), 0)
    _, v3      = cv2.threshold(blur3, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    v3         = _ensure_light_bg(v3)

    # v4: Adaptive on CLAHE (less aggressive for better digit clarity)
    blur4 = cv2.GaussianBlur(gray_clahe, (5, 5), 0)
    v4    = cv2.adaptiveThreshold(blur4, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                  cv2.THRESH_BINARY, 21, 8)
    v4    = _ensure_light_bg(v4)

    # v5: Otsu after strong blur (reduces pixel-level noise on scans)
    blur5      = cv2.GaussianBlur(gray_clahe, (7, 7), 0)
    _, v5      = cv2.threshold(blur5, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    v5         = _ensure_light_bg(v5)

    variants = [("raw", v1), ("clahe", v2), ("otsu", v3), ("adaptive", v4), ("otsu-strong", v5)]

    # Extra variants for ID-Number: Arabic-Indic digits need special treatment
    if label == "ID-Number":
        # Morphological closing to connect thin/broken digit strokes
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        v6 = cv2.morphologyEx(gray_clahe, cv2.MORPH_CLOSE, kernel)
        _, v6 = cv2.threshold(v6, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        v6 = _ensure_light_bg(v6)
        variants.append(("morph-close", v6))

        # Sharpen then Otsu
        sharpen_k = np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
        v7 = cv2.filter2D(gray_clahe, -1, sharpen_k)
        _, v7 = cv2.threshold(v7, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        v7 = _ensure_light_bg(v7)
        variants.append(("sharpen-otsu", v7))

        # Dilate then Otsu (thickens thin strokes)
        kernel_d = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
        v8 = cv2.dilate(gray_clahe, kernel_d, iterations=1)
        _, v8 = cv2.threshold(v8, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        v8 = _ensure_light_bg(v8)
        variants.append(("dilate-otsu", v8))

        # Inverted CLAHE with Otsu
        v9 = cv2.bitwise_not(gray_clahe)
        _, v9 = cv2.threshold(v9, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        v9 = _ensure_light_bg(v9)
        variants.append(("inv-otsu", v9))

        # Gentle adaptive threshold for digit preservation (lower blockSize/C)
        blur_gentle = cv2.GaussianBlur(gray_clahe, (3, 3), 0)
        v10 = cv2.adaptiveThreshold(blur_gentle, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                    cv2.THRESH_BINARY, 15, 5)
        v10 = _ensure_light_bg(v10)
        variants.append(("adaptive-gentle", v10))

    return variants


def _preprocess_for_ocrspace(img: np.ndarray, label: str) -> np.ndarray:
    """OCR.space path: upscale + CLAHE on LAB L-channel (no destructive binarisation)."""
    h, w = img.shape[:2]
    if label in _NUMBER_LABELS:
        scale = max(800 / max(w, 1), 150 / max(h, 1), 3.0)
        img   = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
        lab   = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        l     = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8)).apply(l)
        return cv2.cvtColor(cv2.merge((l, a, b)), cv2.COLOR_LAB2BGR)
    if w < 300 or h < 50:
        scale = max(300 / max(w, 1), 50 / max(h, 1), 2.0)
        img   = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    return img


# ── Digit extraction helpers ──────────────────────────────────────────────────

_ARABIC_INDIC_RE = re.compile(
    "[" + "".join(chr(0x0660 + i) for i in range(10)) + "0-9]"
)


def _extract_all_digits(raw: str) -> str:
    """
    Translate Arabic-Indic to Western, then collect every digit character
    across all lines. This handles cases where Tesseract splits a number
    across OCR lines.
    """
    western = raw.translate(_ARABIC_INDIC)
    return "".join(c for c in western if c.isdigit())


def _best_digit_window(digits: str, expected: int) -> str:
    """
    From a string of digits longer than expected, return the window of
    length `expected` that looks most like a valid ID or date.
    For ID (14 digits): first char must be 2 or 3 (century).
    For date (8 digits): first two must be 19 or 20.
    Falls back to the longest run of at least `expected` consecutive digits.
    """
    if len(digits) == expected:
        return digits
    if len(digits) < expected:
        return digits

    # ID: use structural validation to pick best window
    if expected == 14:
        best_window = digits[:expected]
        best_score = _score_egyptian_id(best_window)
        for start in range(1, len(digits) - expected + 1):
            w = digits[start:start + expected]
            s = _score_egyptian_id(w)
            if s > best_score:
                best_score = s
                best_window = w
        return best_window

    # Date: look for window starting with 19 or 20
    if expected == 8:
        for start in range(len(digits) - expected + 1):
            w = digits[start:start + expected]
            if w[:2] in ("19", "20"):
                return w
        return digits[:expected]

    return digits[:expected]


# ── Tesseract OCR ─────────────────────────────────────────────────────────────

# Whitelist covers Western 0-9 and Arabic-Indic ٠-٩
_DIGIT_WL = "0123456789\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669"


def _tess_number(img_bgr: np.ndarray, label: str) -> str:
    """
    Multi-strategy Tesseract for digit-only fields.

    Matrix:
      5 preprocessing variants  ×  PSM [7, 13, 6, 8, 11]  ×  languages

    Key differences from previous version:
    - Multiline results are NOT discarded — digits are extracted across all lines
    - Without-whitelist attempts added (whitelist can suppress valid digits on
      some Tesseract/model combos)
    - _best_digit_window picks the most plausible window when too many digits
    - Returns as soon as we hit exactly the expected count
    """
    expected = 14 if label == "ID-Number" else 8
    langs    = (["ara", "eng"] if _TESS_ARA else ["eng"])
    wl_cfg   = f"-c tessedit_char_whitelist={_DIGIT_WL}"

    # PSM modes to try:
    # 7  = single text line           (good for date strip)
    # 13 = raw line, no OSD           (bypass orientation/script detection)
    # 6  = uniform block of text      (good for wider ID strip)
    # 8  = single word
    # 11 = sparse text (any position) (catches digits scattered across bg)
    psm_modes = [7, 13, 6, 8, 11]

    # Track candidates as (digit_string, source_description)
    candidates = []
    id_candidates_14 = []   # For consensus voting on ID-Number

    for prep_name, gray in _make_preprocessings(img_bgr, label):
        pil = _PILImage.fromarray(gray)
        for psm in psm_modes:
            for lang in langs:
                for use_wl in [True, False]:      # try with AND without whitelist
                    cfg = f"--psm {psm} --oem 3" + (f" {wl_cfg}" if use_wl else "")
                    try:
                        raw   = pytesseract.image_to_string(pil, lang=lang, config=cfg)
                        digits = _extract_all_digits(raw)
                        ndig   = len(digits)

                        if ndig == 0:
                            continue

                        desc = f"prep={prep_name} psm={psm} lang={lang} wl={use_wl}"

                        # Collect windowed 14-digit candidates for consensus voting
                        if label == "ID-Number" and ndig >= expected:
                            window = _best_digit_window(digits, expected)
                            if len(window) == expected:
                                id_candidates_14.append(window)

                        if ndig == expected:
                            if label == "ID-Number":
                                score = _score_egyptian_id(digits)
                                if score >= 0.9:
                                    print(f"[TESS] [{label}] ✓ high-confidence (score={score:.2f}): {digits}")
                                    return digits
                            else:
                                ok = digits[:2] in ("19", "20")
                                if ok:
                                    print(f"[TESS] [{label}] ✓ exact {expected} plausible digits")
                                    return normalize_text(digits, label)

                        candidates.append((digits, ndig, desc))

                    except Exception as e:
                        pass   # silently skip; don't pollute logs with 50 error lines

    # ── Consensus voting for ID-Number ────────────────────────────────────────
    if label == "ID-Number" and len(id_candidates_14) >= 3:
        consensus = _consensus_vote(id_candidates_14, expected)
        score = _score_egyptian_id(consensus)
        print(f"[TESS] [ID-Number] consensus from {len(id_candidates_14)} candidates: "
              f"{consensus!r} (score={score:.2f})")
        if score >= 0.4:
            return consensus

    if not candidates:
        print(f"[TESS] [{label}] no digits found across all strategies")
        return ""

    # For ID-Number: prefer structural validity over raw digit count
    if label == "ID-Number":
        scored = []
        for dig, ndig, desc in candidates:
            if ndig >= expected:
                w = _best_digit_window(dig, expected)
                s = _score_egyptian_id(w)
                scored.append((w, s, desc))
        if scored:
            scored.sort(key=lambda x: -x[1])
            best_digits, best_score, best_desc = scored[0]
            print(f"[TESS] [ID-Number] best structural: {best_digits!r} "
                  f"score={best_score:.2f} ({best_desc})")
            return best_digits

    # Fallback: pick candidate closest to expected digit count
    def _score(c):
        ndig = c[1]
        if ndig >= expected:
            return (0, ndig - expected)
        return (1, expected - ndig)

    candidates.sort(key=_score)
    best_digits, best_count, best_desc = candidates[0]
    print(f"[TESS] [{label}] best={best_count} digits ({best_desc}): {best_digits!r}")

    if best_count > expected:
        best_digits = _best_digit_window(best_digits, expected)

    if label in ("Birth-Date", "expiry_date"):
        return normalize_text(best_digits, label)
    return best_digits


def _tess_arabic_text(img: np.ndarray, label: str) -> str:
    """Tesseract fallback for Arabic text when OCR.space is unreachable."""
    if not (_TESS_OK and _TESS_ARA):
        return ""
    h, w = img.shape[:2]
    scale = max(600 / max(w, 1), 1.0)
    if scale > 1.05:
        img = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    pil  = _PILImage.fromarray(gray)
    try:
        raw  = pytesseract.image_to_string(pil, lang="ara", config="--psm 6 --oem 3").strip()
        text = normalize_text(raw, label)
        print(f"[TESS-ARA] [{label}] raw={raw!r} -> {text!r}")
        return text
    except Exception as e:
        print(f"[TESS-ARA] [{label}] error: {e}")
        return ""


# ── OCR.space ─────────────────────────────────────────────────────────────────

def _ocr_space(img_bytes: bytes, label: str, key: str,
               language: str, engine: int, attempt: int = 1) -> str:
    print(f"[OCR.space] [{label}] {len(img_bytes)//1024}KB "
          f"lang={language} eng={engine} attempt={attempt}")
    try:
        r = requests.post(
            "https://api.ocr.space/parse/image",
            files={"file": ("crop.jpg", img_bytes, "image/jpeg")},
            data={"apikey": key, "language": language, "OCREngine": engine,
                  "isOverlayRequired": False, "detectOrientation": True, "scale": True},
            timeout=12,
        )
        if r.status_code in (403, 429):
            print(f"[OCR.space] RATE-LIMITED [{label}] HTTP {r.status_code}")
            return ""
        r.raise_for_status()
        res = r.json()
        if res.get("IsErroredOnProcessing"):
            print(f"[OCR.space] API error [{label}]: "
                  f"{res.get('ErrorMessage', res.get('ErrorDetails', ''))}")
            return ""
        parsed = res.get("ParsedResults", [])
        if not parsed:
            return ""
        raw  = parsed[0].get("ParsedText", "").strip()
        text = normalize_text(raw, label)
        print(f"[OCR.space] [{label}] raw={raw!r} -> {text!r}")
        return text
    except requests.exceptions.Timeout:
        if attempt == 1:
            print(f"[OCR.space] Timeout on attempt 1, retrying after 2s...")
            time.sleep(2)
            return _ocr_space(img_bytes, label, key, language, engine, 2)
        print(f"[OCR.space] [{label}] timeout on attempt 2 — giving up")
        return ""
    except requests.exceptions.ConnectionError as e:
        if attempt <= 2:
            wait = 3 if attempt == 1 else 5
            print(f"[OCR.space] [{label}] connection error (DNS/network issue): {e}")
            print(f"[OCR.space] [{label}] retrying in {wait}s (attempt {attempt}/2)...")
            time.sleep(wait)
            return _ocr_space(img_bytes, label, key, language, engine, attempt + 1)
        print(f"[OCR.space] [{label}] connection failed after {attempt} attempts")
        return ""
    except Exception as e:
        print(f"[OCR.space] [{label}] {type(e).__name__}: {e}")
        return ""


# ── Result quality scorer ─────────────────────────────────────────────────────

def _digit_quality(text: str, expected: int) -> int:
    """Return number of digit characters; used to compare results."""
    return len("".join(c for c in text if c.isdigit()))


# ── Custom Segmenter & Template Matcher for Egyptian ID ───────────────────────


def correct_misread_numerals(raw_digits: str, label: str = "ID-Number") -> str:
    """
    Post-process OCR digit results to correct commonly misread Arabic-Indic numerals.
    Uses structural validation (Egyptian ID rules) to fix obvious OCR errors.
    
    Common misreads:
    - ٤ (4) often read as 0
    - ٦ (6) often read as 2  
    - ١ (1) often read as 0
    
    Applies Egyptian ID structural heuristics:
    - Validates century digit (must be 2 or 3)
    - Validates governorate code (must be in _VALID_GOVERNORATES)
    """
    if label != "ID-Number" or len(raw_digits) != 14:
        return raw_digits
    
    current_score = _score_egyptian_id(raw_digits)
    if current_score >= 0.75:
        return raw_digits
    
    print(f"[CORRECT] Low score {current_score:.2f} for ID {raw_digits}, attempting correction...")
    
    candidates = []
    
    # Strategy 1: If century digit invalid, try both 2 and 3
    if raw_digits[0] not in ("2", "3"):
        for century in ["2", "3"]:
            candidate = century + raw_digits[1:]
            s = _score_egyptian_id(candidate)
            if s > current_score:
                candidates.append((candidate, s, "century_fix"))
                print(f"[CORRECT] Try century {century}: score {s:.2f}")
    
    # Strategy 2: If governorate invalid, try nearby digit corrections
    if raw_digits[7:9] not in _VALID_GOVERNORATES:
        swaps = [
            (('0', '1'), (raw_digits[7].replace('0', '1'), raw_digits[8])),
            (('0', '4'), (raw_digits[7].replace('0', '4'), raw_digits[8])),
            (('2', '6'), (raw_digits[7], raw_digits[8].replace('2', '6'))),
            (('0', '1'), (raw_digits[7], raw_digits[8].replace('0', '1'))),
            (('0', '4'), (raw_digits[7], raw_digits[8].replace('0', '4'))),
            (('2', '6'), (raw_digits[7].replace('2', '6'), raw_digits[8])),
        ]
        for (from_c, to_c), (g7, g8) in swaps:
            candidate = raw_digits[:7] + g7 + g8 + raw_digits[9:]
            if candidate[7:9] in _VALID_GOVERNORATES:
                s = _score_egyptian_id(candidate)
                if s > current_score:
                    candidates.append((candidate, s, f"gov_fix_{from_c}_to_{to_c}"))
                    print(f"[CORRECT] Swap {from_c}→{to_c} in gov: {candidate[7:9]} score {s:.2f}")
    
    # Strategy 3: General digit swaps for common OCR confusions
    common_swaps = [('0', '1'), ('0', '4'), ('2', '6')]
    for pos in range(len(raw_digits)):
        for from_d, to_d in common_swaps:
            if raw_digits[pos] == from_d:
                candidate = raw_digits[:pos] + to_d + raw_digits[pos+1:]
                s = _score_egyptian_id(candidate)
                if s > current_score and s >= 0.72:
                    candidates.append((candidate, s, f"pos{pos}_{from_d}_to_{to_d}"))
    
    if candidates:
        candidates.sort(key=lambda x: -x[1])
        best, best_score, strategy = candidates[0]
        if best_score > current_score:
            print(f"[CORRECT] APPLIED: {raw_digits} -> {best} (score {current_score:.2f} -> {best_score:.2f}) [{strategy}]")
            return best
    
    print(f"[CORRECT] No correction found, keeping: {raw_digits}")
    return raw_digits

def _segment_and_match_id(img_bgr: np.ndarray) -> str:
    """
    Custom high-precision segmenter and template-matching classifier for Egyptian ID-Number.
    Segments the 14 Arabic-Indic digits and matches them against rendered system fonts.
    """
    try:
        h, w = img_bgr.shape[:2]
        gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
        gray_clahe = clahe.apply(gray)

        thresh = cv2.adaptiveThreshold(
            gray_clahe, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 31, 10
        )

        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        candidates = []
        for cnt in contours:
            x, y, cw, ch = cv2.boundingRect(cnt)
            cy = y + ch / 2.0
            if cw >= 8 and ch >= 8 and cw < w * 0.1 and ch < h * 0.6:
                candidates.append((x, y, cw, ch, cy))

        if len(candidates) < 5:
            return ""

        median_cy = np.median([c[4] for c in candidates])
        digits_boxes = [c for c in candidates if abs(c[4] - median_cy) <= 12]
        digits_boxes.sort(key=lambda b: b[0])

        if len(digits_boxes) != 14:
            print(f"[Custom OCR] Expected 14 digits, found {len(digits_boxes)}. Falling back to standard OCR.")
            return ""

        # Load system fonts
        font_paths = [
            r"C:\Windows\Fonts\arial.ttf",
            r"C:\Windows\Fonts\tahoma.ttf",
            r"C:\Windows\Fonts\arabtype.ttf"
        ]
        arabic_digits = ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"]

        templates = {}
        for font_path in font_paths:
            if not os.path.exists(font_path):
                continue
            font_name = os.path.basename(font_path)
            try:
                font = _ImageFont.truetype(font_path, 40)
            except Exception:
                continue

            for val, char in enumerate(arabic_digits):
                temp_img = _PILImage.new("L", (80, 80), 255)
                draw = _ImageDraw.Draw(temp_img)
                draw.text((20, 10), char, font=font, fill=0)
                
                temp_cv = np.array(temp_img)
                _, t_thresh = cv2.threshold(temp_cv, 127, 255, cv2.THRESH_BINARY_INV)
                
                t_cnts, _ = cv2.findContours(t_thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                if t_cnts:
                    tx, ty, tcw, tch = cv2.boundingRect(t_cnts[0])
                    for tc in t_cnts[1:]:
                        tx2, ty2, tcw2, tch2 = cv2.boundingRect(tc)
                        x1 = min(tx, tx2)
                        y1 = min(ty, ty2)
                        x2 = max(tx + tcw, tx2 + tcw2)
                        y2 = max(ty + tch, ty2 + tch2)
                        tx, ty, tcw, tch = x1, y1, x2 - x1, y2 - y1
                    
                    digit_template = t_thresh[ty:ty+tch, tx:tx+tcw]
                    digit_template_resized = cv2.resize(digit_template, (32, 32), interpolation=cv2.INTER_AREA)
                    templates[(val, font_name)] = digit_template_resized

        if not templates:
            return ""

        recognized = []
        for x, y, cw, ch, cy in digits_boxes:
            digit_crop = thresh[y:y+ch, x:x+cw]
            digit_crop_resized = cv2.resize(digit_crop, (32, 32), interpolation=cv2.INTER_AREA)
            
            best_val = -1
            best_score = -1.0
            for (val, font_name), t_img in templates.items():
                res = cv2.matchTemplate(digit_crop_resized, t_img, cv2.TM_CCOEFF_NORMED)
                _, score, _, _ = cv2.minMaxLoc(res)
                if score > best_score:
                    best_score = score
                    best_val = val
            
            # 0 (dot) override by height
            if ch < 20:
                best_val = 0
                
            recognized.append(str(best_val))

        return "".join(recognized)
    except Exception as e:
        print(f"[Custom OCR] Error: {e}")
        return ""


# ── Unified OCR entry point ───────────────────────────────────────────────────

def ocr_cv2_image(img: np.ndarray, label: str = "", api_key: str = None) -> str:
    key      = api_key or settings.OCR_SPACE_API_KEY
    expected = 14 if label == "ID-Number" else 8

    # ── Number fields ────────────────────────────────────────────────────────
    if label in _NUMBER_LABELS:
        if label == "ID-Number":
            custom_res = _segment_and_match_id(img)
            if custom_res:
                # Apply digit correction to custom segmenter result
                corrected_res = correct_misread_numerals(custom_res, "ID-Number")
                score = _score_egyptian_id(corrected_res)
                if score >= 0.8:
                    print(f"[OCR] [ID-Number] Custom Segmenter & Template Matcher (score={score:.2f}): {corrected_res}")
                    return corrected_res
                print(f"[OCR] [ID-Number] Custom Segmenter low-score ({corrected_res}, score={score:.2f}), trying other methods...")

        tess_result = ""
        tess_ndig   = 0

        if _TESS_OK:
            tess_result = _tess_number(img, label)
            tess_ndig   = _digit_quality(tess_result, expected)
            if tess_ndig == expected:
                digits = "".join(c for c in tess_result if c.isdigit())
                if label == "ID-Number":
                    score = _score_egyptian_id(digits)
                    if score >= 0.7:
                        print(f"[OCR] [ID-Number] Tesseract match ✓ (score={score:.2f})")
                        return tess_result
                    print(f"[OCR] [ID-Number] Tesseract 14 digits but low score={score:.2f}, trying OCR.space")
                else:
                    ok = digits[:2] in ("19", "20") if len(digits) >= 2 else False
                    if ok:
                        print(f"[OCR] [{label}] Tesseract exact match ✓")
                        return tess_result
                    print(f"[OCR] [{label}] Tesseract exact count but implausible, also trying OCR.space")

        # Try OCR.space (always, as cross-check / fallback)
        proc = _preprocess_for_ocrspace(img, label)
        ok_enc, buf = cv2.imencode(".jpg", proc, [cv2.IMWRITE_JPEG_QUALITY, 92])
        ocr_results = []   # list of (text, ndig)

        if ok_enc:
            img_bytes = buf.tobytes()
            # Try Arabic first (Arabic-Indic numerals), then English
            for lang, eng in [("ara", 1), ("ara", 2), ("eng", 1), ("eng", 2)]:
                res  = _ocr_space(img_bytes, label, key, lang, eng)
                ndig = _digit_quality(res, expected)
                if ndig > 0:
                    ocr_results.append((res, ndig))
                if ndig == expected:
                    digits = "".join(c for c in res if c.isdigit())
                    if label == "ID-Number":
                        score = _score_egyptian_id(digits)
                        if score >= 0.7:
                            print(f"[OCR] [ID-Number] OCR.space match ✓ (score={score:.2f})")
                            return res
                    else:
                        ok_v = digits[:2] in ("19", "20") if len(digits) >= 2 else False
                        if ok_v:
                            print(f"[OCR] [{label}] OCR.space exact match ✓")
                            return res
                time.sleep(0.3)

        # Neither gave exact count — pick the best available
        all_results = []
        if tess_result:
            all_results.append((tess_result, tess_ndig, "tess"))
        for res, ndig in ocr_results:
            all_results.append((res, ndig, "ocrspace"))

        if not all_results:
            return ""

        # For ID-Number: prefer structural validity
        if label == "ID-Number":
            scored = []
            for text, ndig, src in all_results:
                d = "".join(c for c in text if c.isdigit())
                if ndig >= expected:
                    w = _best_digit_window(d, expected)
                    s = _score_egyptian_id(w)
                    scored.append((w, s, src))
                elif ndig >= expected - 2:
                    scored.append((d, 0.0, src))
            if scored:
                scored.sort(key=lambda x: -x[1])
                winner_text, winner_score, winner_src = scored[0]
                print(f"[OCR] [ID-Number] winner={winner_src} score={winner_score:.2f}: {winner_text!r}")
                return winner_text

        # Fallback: prefer closer to expected count
        def _sort_key(r):
            nd = r[1]
            return (0, nd - expected) if nd >= expected else (1, expected - nd)

        all_results.sort(key=_sort_key)
        winner_text, winner_ndig, winner_src = all_results[0]
        print(f"[OCR] [{label}] winner={winner_src} {winner_ndig} digits: {winner_text!r}")
        
        # Apply digit correction for ID-Number
        if label == "ID-Number":
            winner_text = correct_misread_numerals(winner_text, "ID-Number")
            print(f"[OCR] [{label}] after correction: {winner_text!r}")
        
        return winner_text

    # ── Text fields: OCR.space → Tesseract Arabic fallback ──────────────────
    proc = _preprocess_for_ocrspace(img, label)
    ok_enc, buf = cv2.imencode(".jpg", proc, [cv2.IMWRITE_JPEG_QUALITY, 85])
    if not ok_enc:
        return ""
    result = _ocr_space(buf.tobytes(), label, key,
                        settings.OCR_LANGUAGE, settings.OCR_ENGINE)
    if result:
        return result
    print(f"[OCR.space] [{label}] failed → Tesseract Arabic fallback")
    return _tess_arabic_text(img, label)


# ── Address extraction ────────────────────────────────────────────────────────

def extract_address(img: np.ndarray, x1: int, y1: int,
                    x2: int, y2: int, api_key: str = None) -> str:
    h, w   = y2 - y1, x2 - x1
    ay1    = y1 + int(h * 0.48)
    ay2    = y1 + int(h * 0.68)
    ax1    = x1 + int(w * 0.30)
    crop   = img[ay1:ay2, ax1:x2]
    ch, cw = crop.shape[:2]
    print(f"[ADDR] crop={cw}x{ch} ({ax1},{ay1})->({x2},{ay2})")
    if cw < 10 or ch < 10:
        print("[ADDR] too small, skipping")
        return ""
    raw   = ocr_cv2_image(crop, label="Address", api_key=api_key)
    lines = []
    for ln in raw.split("|"):
        ln = ln.strip()
        if not ln:
            continue
        words = ln.split()
        if len(words) >= 5 and all(w.isalpha() for w in words) \
                and not any(c.isdigit() for c in ln):
            continue
        lines.append(ln)
    return " - ".join(lines)


# ── Direct OCR test (no YOLO) ─────────────────────────────────────────────────

def test_ocr_direct(image_bytes: bytes) -> dict:
    arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        return {"error": "Cannot decode image"}
    key = settings.OCR_SPACE_API_KEY
    _, buf = cv2.imencode(".jpg", img, [cv2.IMWRITE_JPEG_QUALITY, 85])
    try:
        r = requests.post(
            "https://api.ocr.space/parse/image",
            files={"file": ("test.jpg", buf.tobytes(), "image/jpeg")},
            data={"apikey": key, "language": settings.OCR_LANGUAGE,
                  "OCREngine": settings.OCR_ENGINE,
                  "isOverlayRequired": False, "detectOrientation": True, "scale": True},
            timeout=20,
        )
        return {"http_status": r.status_code, "raw_response": r.json(),
                "api_key_used": key[:6] + "***",
                "language": settings.OCR_LANGUAGE, "engine": settings.OCR_ENGINE}
    except Exception as e:
        return {"error": str(e)}


# ── Full pipeline ─────────────────────────────────────────────────────────────

def run_pipeline(image_bytes: bytes, model_name: str = None,
                 conf: float = None, padding: int = None) -> dict:
    model_name = model_name or settings.MODEL_NAME
    conf       = conf    or settings.DEFAULT_CONF
    padding    = padding or settings.DEFAULT_PADDING

    arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Cannot decode image — unsupported format or corrupt file.")

    h, w     = img.shape[:2]
    img_area = h * w
    mdl      = get_model(model_name)
    res      = mdl(img, conf=conf)[0]
    dets     = []

    all_labels = [mdl.names[int(cls)] for cls in res.boxes.cls]
    print(f"[YOLO] {len(res.boxes)} boxes in {w}x{h} — {all_labels}")

    field_boxes, card_box = [], None

    for i, box in enumerate(res.boxes.xyxy):
        x1, y1, x2, y2 = map(int, box)
        label      = mdl.names[int(res.boxes.cls[i])]
        cf         = float(res.boxes.conf[i])
        area_ratio = (x2 - x1) * (y2 - y1) / img_area
        print(f"[YOLO] {label!r} conf={cf:.2f} area={area_ratio:.0%}")
        if area_ratio > 0.50:
            if card_box is None:
                card_box = (x1, y1, x2, y2, label, cf)
        else:
            field_boxes.append((x1, y1, x2, y2, label, cf))

    if card_box is not None:
        cx1, cy1, cx2, cy2, clabel, ccf = card_box
        addr = extract_address(img, cx1, cy1, cx2, cy2)
        if addr:
            dets.append({"id": 0, "label": "Address",
                         "confidence": round(ccf, 4), "text": addr,
                         "box": {"x1": cx1, "y1": cy1, "x2": cx2, "y2": cy2}})
        dets.append({"id": 0, "label": clabel, "confidence": round(ccf, 4),
                     "text": "",
                     "box": {"x1": cx1, "y1": cy1, "x2": cx2, "y2": cy2}})
        if field_boxes:
            time.sleep(settings.OCR_RATE_LIMIT_S)

    for idx, (x1, y1, x2, y2, label, cf) in enumerate(field_boxes):
        crop = img[max(0, y1 - padding):min(h, y2 + padding),
                   max(0, x1 - padding):min(w, x2 + padding)]
        ch, cw = crop.shape[:2]
        print(f"[YOLO] [{label}] conf={cf:.2f} crop={cw}x{ch}")
        text = ocr_cv2_image(crop, label=label)
        dets.append({"id": 0, "label": label, "confidence": round(cf, 4),
                     "text": text,
                     "box": {"x1": x1, "y1": y1, "x2": x2, "y2": y2}})
        if label not in _NUMBER_LABELS and idx < len(field_boxes) - 1:
            time.sleep(settings.OCR_RATE_LIMIT_S)

    for idx, d in enumerate(dets, 1):
        d["id"] = idx

    # ── Smart fallback: derive Birth-Date from National ID ───────────────────
    national_id_det = next((d for d in dets if d["label"] == "ID-Number"), None)
    if national_id_det:
        digits = "".join(c for c in national_id_det["text"] if c.isdigit())
        if len(digits) == 14:
            chars = list(digits)
            # Correct century digit if invalid
            if chars[0] not in ("2", "3"):
                try:
                    y = int("".join(chars[1:3]))
                    chars[0] = "2" if y > 25 else "3"
                    corrected_id = "".join(chars)
                    print(f"[Pipeline] Corrected ID-Number from {digits} to {corrected_id}")
                    national_id_det["text"] = corrected_id
                except Exception:
                    pass

    national_id   = national_id_det["text"] if national_id_det else ""
    birthdate_det = next((d for d in dets if d["label"] == "Birth-Date"), None)
    id_score      = _score_egyptian_id(national_id) if national_id_det else 0.0
    id_ndig       = len("".join(c for c in national_id if c.isdigit()))

    if id_ndig == 14 and birthdate_det is not None:
        derived, dob_conf = _derive_birthdate_from_id(national_id)
        if derived:
            print(f"[Pipeline] Birth-Date {birthdate_det['text']!r} → {derived!r} (from ID, conf={dob_conf:.2f})")
            birthdate_det["text"]   = derived
            birthdate_det["source"] = "derived_from_id"
            birthdate_det["id_confidence"] = id_score  # Track ID confidence
            birthdate_det["dob_confidence"] = dob_conf  # Track DOB derivation confidence

    print(f"[Pipeline] Done — {len(dets)} detections")

    ann = img.copy()
    for d in dets:
        b = d["box"]
        cv2.rectangle(ann, (b["x1"], b["y1"]), (b["x2"], b["y2"]), (0, 200, 100), 2)
        cv2.putText(ann, f"{d['label']}: {d['text'][:25] or '--'}",
                    (b["x1"], max(b["y1"] - 8, 12)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0, 200, 100), 2)

    _, jpeg = cv2.imencode(".jpg", ann)
    return {"total": len(dets), "detections": dets,
            "annotated_image_bytes": jpeg.tobytes()}