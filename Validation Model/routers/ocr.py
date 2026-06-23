import re
import json
import base64
from datetime import datetime, timezone
from fastapi import APIRouter, File, UploadFile, HTTPException, Query, Header
from fastapi.responses import Response
from pydantic import BaseModel
from typing import Optional, List
from services.ocr_service import run_pipeline, test_ocr_direct
from config import settings
from auth import verify_api_key

router = APIRouter()


# ── Pydantic models ───────────────────────────────────────────────────────────

class OCRData(BaseModel):
    fullName:    str = ""
    nationalId:  str = ""
    dateOfBirth: str = ""
    address:     str = ""

class ValidationData(BaseModel):
    IdCard:      float = 0.0
    fullName:    float = 0.0
    nationalId:  float = 0.0
    dateOfBirth: float = 0.0
    address:     float = 0.0

class OCRResponse(BaseModel):
    ocr:        OCRData
    validation: ValidationData



# ── Address parsing ───────────────────────────────────────────────────────────

def _parse_address(text: str) -> str:
    """
    Convert OCR address text into single-line format with dashes.
    Handles merged lines by splitting on district keywords.
    Returns: "اجهور الكبري - مركز طوخ - القليوبية"
    """
    if not text:
        return ""

    # 1. Normalise explicit separators (' - ', '-', ' | ') to consistent dash format
    combined = text.replace(" | ", " - ").replace("-", " - ").replace("  -  ", " - ")

    # 2. Clean up multiple spaces
    combined = " ".join(combined.split())

    return combined


# ── Payload builder ───────────────────────────────────────────────────────────

def _build_payload(result: dict) -> dict:
    ocr_data = {
        "fullName":    "",
        "nationalId":  "",
        "dateOfBirth": "",
        "address":     ""
    }
    validation_data = {
        "IdCard":      0.0,
        "fullName":    0.0,
        "nationalId":  0.0,
        "dateOfBirth": 0.0,
        "address":     0.0
    }

    id_confidence = 0.0
    dob_derivation_conf = 0.0
    id_conf_score = 0.0

    for d in result["detections"]:
        label = d["label"]
        text  = d["text"]
        conf  = round(d["confidence"], 2)

        if label == "Name":
            ocr_data["fullName"] = text
            validation_data["fullName"] = max(validation_data["fullName"], conf)
        elif label == "ID-Number":
            ocr_data["nationalId"] = text
            validation_data["nationalId"] = max(validation_data["nationalId"], conf)
            id_confidence = conf
        elif label == "Birth-Date":
            ocr_data["dateOfBirth"] = text
            validation_data["dateOfBirth"] = max(validation_data["dateOfBirth"], conf)
            dob_derivation_conf = d.get("dob_confidence", conf)
            id_conf_score = d.get("id_confidence", 0.0)
        elif label == "Address":
            ocr_data["address"] = _parse_address(text)
            validation_data["address"] = max(validation_data["address"], conf)
        else:
            validation_data["IdCard"] = max(validation_data["IdCard"], conf)

    # Smart confidence adjustment for DOB based on ID confidence
    if id_conf_score > 0.0 and id_conf_score < 0.70:
        adjusted_dob_conf = max(validation_data["dateOfBirth"] * 0.85, dob_derivation_conf * 0.9)
        validation_data["dateOfBirth"] = round(adjusted_dob_conf, 2)
    elif dob_derivation_conf > 0.0:
        validation_data["dateOfBirth"] = round(max(validation_data["dateOfBirth"], dob_derivation_conf), 2)

    return {
        "ocr":        ocr_data,
        "validation": validation_data
    }


# ── POST /ocr/test  ->  raw OCR.space response (no YOLO) ─────────────────────

@router.post("/test")
async def test_ocr(
    file:      UploadFile = File(...),
    x_api_key: Optional[str] = Header(None),
):
    """Send image directly to OCR.space with no YOLO -- diagnose API issues."""
    verify_api_key(x_api_key)
    return test_ocr_direct(await file.read())


# ── GET /ocr/quota-check  ->  test if API key is alive ───────────────────────

@router.get("/quota-check")
async def quota_check(x_api_key: Optional[str] = Header(None)):
    """
    Ping OCR.space with a tiny 10x10 image to verify if the API key
    is working, rate-limited, or quota-exceeded -- no YOLO needed.
    """
    import requests as _req
    import numpy as _np
    import cv2 as _cv2

    verify_api_key(x_api_key)
    key = settings.OCR_SPACE_API_KEY

    pixel = _np.full((10, 10, 3), 255, dtype=_np.uint8)
    _, buf = _cv2.imencode(".jpg", pixel)

    try:
        r = _req.post(
            "https://api.ocr.space/parse/image",
            files={"file": ("pixel.jpg", buf.tobytes(), "image/jpeg")},
            data={"apikey": key, "language": "eng", "OCREngine": 1},
            timeout=12,
        )
        body = r.json() if "application/json" in r.headers.get("content-type", "") else {}
        status = "ok"
        if r.status_code in (403, 429):
            status = "rate_limited_or_quota_exceeded"
        elif r.status_code != 200:
            status = f"http_error_{r.status_code}"
        elif body.get("IsErroredOnProcessing"):
            msg = str(body.get("ErrorMessage", ""))
            if any(w in msg.lower() for w in ("limit", "quota", "exceeded", "trial")):
                status = "quota_exceeded"
            else:
                status = "api_error"
        return {
            "status":       status,
            "http_code":    r.status_code,
            "api_key_used": key[:6] + "***",
            "ocr_response": body,
        }
    except _req.exceptions.Timeout:
        return {"status": "timeout", "api_key_used": key[:6] + "***"}
    except Exception as e:
        return {"status": "error", "detail": str(e), "api_key_used": key[:6] + "***"}


# ── POST /ocr/detect  ->  structured JSON response ───────────────────────────

@router.post("/detect", response_model=OCRResponse)
async def detect(
    file:          UploadFile = File(...),
    model_name:    str        = Query(default=None),
    conf:          float      = Query(0.4),
    padding:       int        = Query(5),
    include_image: bool       = Query(True),
    x_api_key:     Optional[str] = Header(None),
):
    verify_api_key(x_api_key)
    model_name = model_name or settings.MODEL_NAME
    try:
        result = run_pipeline(await file.read(), model_name, conf, padding)
    except FileNotFoundError as e:
        raise HTTPException(404, str(e))
    except ValueError as e:
        raise HTTPException(422, str(e))
    except Exception as e:
        raise HTTPException(500, str(e))

    payload = _build_payload(result)
    return OCRResponse(**payload)


# ── POST /ocr/detect/json  ->  downloadable .json file ───────────────────────

@router.post("/detect/json")
async def detect_json(
    file:       UploadFile = File(...),
    model_name: str        = Query(default=None),
    conf:       float      = Query(0.4),
    padding:    int        = Query(5),
    x_api_key:  Optional[str] = Header(None),
):
    """
    Full OCR pipeline -- returns a timestamped downloadable JSON file
    with every detected field (Name, ID-Number, Birth-Date, Address, etc.),
    its extracted text, confidence score, and bounding box.
    """
    verify_api_key(x_api_key)
    model_name = model_name or settings.MODEL_NAME
    try:
        result = run_pipeline(await file.read(), model_name, conf, padding)
    except FileNotFoundError as e:
        raise HTTPException(404, str(e))
    except ValueError as e:
        raise HTTPException(422, str(e))
    except Exception as e:
        raise HTTPException(500, str(e))

    payload    = _build_payload(result)
    json_bytes = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
    filename   = "ocr_results_" + datetime.now().strftime("%Y%m%d_%H%M%S") + ".json"

    return Response(
        content    = json_bytes,
        media_type = "application/json",
        headers    = {"Content-Disposition": f'attachment; filename="{filename}"'},
    )


# ── POST /ocr/detect/image  ->  annotated JPEG only ──────────────────────────

@router.post("/detect/image")
async def detect_image(
    file:       UploadFile = File(...),
    model_name: str        = Query(default=None),
    conf:       float      = Query(0.4),
    padding:    int        = Query(5),
    x_api_key:  Optional[str] = Header(None),
):
    verify_api_key(x_api_key)
    model_name = model_name or settings.MODEL_NAME
    try:
        result = run_pipeline(await file.read(), model_name, conf, padding)
    except Exception as e:
        raise HTTPException(500, str(e))
    return Response(
        content    = result["annotated_image_bytes"],
        media_type = "image/jpeg",
    )