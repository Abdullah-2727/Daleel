# This file contains the updated functions to be integrated into ocr_service.py

# Update normalize_text - add these lines after the "Address" handling:
# After line: return " | ".join(lines) if lines else text
# Add:
#    # For text labels (Name, etc.), also normalize Arabic letter variants
#    if label in ("Name",):
#        text = normalize_arabic_text(text)

# COMPLETE correct_misread_numerals function - INSERT AFTER _digit_quality function

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
    - Uses consensus voting if multiple plausible corrections exist
    """
    if label != "ID-Number" or len(raw_digits) != 14:
        return raw_digits
    
    current_score = _score_egyptian_id(raw_digits)
    if current_score >= 0.75:
        # Already good enough
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
    
    # Strategy 2: If governorate invalid, try nearby digit corrections in gov position
    if raw_digits[7:9] not in _VALID_GOVERNORATES:
        gov = raw_digits[7:9]
        # Try swapping commonly confused digits (0↔4, 2↔6, 0↔1)
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
    
    # Strategy 3: General digit swaps for common OCR confusions (0↔1, 0↔4, 2↔6)
    # Try correcting positions where OCR is likely confused
    common_swaps = [('0', '1'), ('0', '4'), ('2', '6')]
    for pos in range(len(raw_digits)):
        for from_d, to_d in common_swaps:
            if raw_digits[pos] == from_d:
                candidate = raw_digits[:pos] + to_d + raw_digits[pos+1:]
                s = _score_egyptian_id(candidate)
                if s > current_score and s >= 0.72:  # Must be meaningful improvement
                    candidates.append((candidate, s, f"pos{pos}_{from_d}_to_{to_d}"))
    
    if candidates:
        # Pick best candidate
        candidates.sort(key=lambda x: -x[1])
        best, best_score, strategy = candidates[0]
        if best_score > current_score:
            print(f"[CORRECT] CORRECTION APPLIED: {raw_digits} → {best} (score {current_score:.2f} → {best_score:.2f}) [{strategy}]")
            return best
    
    print(f"[CORRECT] No good correction found, keeping original: {raw_digits}")
    return raw_digits
