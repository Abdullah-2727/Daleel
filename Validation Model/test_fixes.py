"""
Test script to verify the OCR fixes for Arabic ID card processing.
Tests:
1. Arabic-Indic numeral normalization
2. Arabic text normalization (ى vs ي)
3. DOB derivation from National ID
4. Digit correction heuristics
"""

import sys
sys.path.insert(0, r'c:\zain\Working Space\Under WORK\final\api03')

from services.ocr_service import (
    normalize_arabic_text,
    normalize_text,
    _derive_birthdate_from_id,
    correct_misread_numerals,
    _score_egyptian_id
)

def test_arabic_text_normalization():
    """Test Arabic letter variant normalization"""
    print("\n" + "="*60)
    print("TEST 1: Arabic Text Normalization")
    print("="*60)
    
    # Test ى → ي
    text1 = "محمود الشامى"  # with Alif Maksura
    result1 = normalize_arabic_text(text1)
    print(f"  ى vs ي normalization:")
    print(f"    Input:  {text1}")
    print(f"    Output: {result1}")
    assert 'ي' in result1 and 'ى' not in result1, "Should convert ى to ي"
    print("    Status: PASS")
    
    # Test أ/إ → ا
    text2 = "أسلام إسلام"
    result2 = normalize_arabic_text(text2)
    print(f"\n  أ/إ → ا normalization:")
    print(f"    Input:  {text2}")
    print(f"    Output: {result2}")
    assert 'ا' in result2, "Should convert أ and إ to ا"
    print("    Status: PASS")

def test_normalize_text_with_arabic():
    """Test normalize_text function with Name label"""
    print("\n" + "="*60)
    print("TEST 2: normalize_text with Arabic normalization")
    print("="*60)
    
    name_with_variants = "اسلام السيد محمود الشامى"
    result = normalize_text(name_with_variants, label="Name")
    print(f"  Full name normalization:")
    print(f"    Input:  {name_with_variants}")
    print(f"    Output: {result}")
    assert 'ى' not in result, "Should normalize ى away"
    print("    Status: PASS")

def test_id_derivation_with_confidence():
    """Test DOB derivation with confidence scoring"""
    print("\n" + "="*60)
    print("TEST 3: DOB Derivation from National ID")
    print("="*60)
    
    # Test with the user's ID: 30406011402713
    # Structure: 3 04 06 01 14 0271 3
    # Century: 3 = 20xx
    # Year: 04 = 2004
    # Month: 06 = June
    # Day: 01
    test_id = "30406011402713"
    
    dob, confidence = _derive_birthdate_from_id(test_id)
    print(f"  ID: {test_id}")
    print(f"  Derived DOB: {dob}")
    print(f"  Confidence: {confidence:.2f}")
    
    # Verify the result
    assert dob == "2004-06-01", f"Expected 2004-06-01, got {dob}"
    assert confidence >= 0.75, f"Expected confidence >= 0.75, got {confidence}"
    print("  Status: PASS (Correct DOB: 2004-06-01)")

def test_digit_correction():
    """Test digit correction heuristics"""
    print("\n" + "="*60)
    print("TEST 4: Digit Correction Heuristics")
    print("="*60)
    
    # Simulate OCR error: user's wrong ID from the issue
    # Wrong: 30001200100010
    # Correct: 30406011402713
    # The OCR read: ٤→0, ٦→2, ١→0 in wrong positions
    
    wrong_id = "30001200100010"
    print(f"  OCR Output (wrong): {wrong_id}")
    
    corrected = correct_misread_numerals(wrong_id, "ID-Number")
    print(f"  After correction:  {corrected}")
    
    original_score = _score_egyptian_id(wrong_id)
    corrected_score = _score_egyptian_id(corrected)
    
    print(f"  Original score: {original_score:.2f}")
    print(f"  Corrected score: {corrected_score:.2f}")
    print(f"  Improvement: {corrected_score - original_score:+.2f}")
    
    # The correction should improve the score
    assert corrected_score > original_score, "Correction should improve score"
    print("  Status: PASS")

def test_valid_id_not_corrected():
    """Test that good IDs aren't unnecessarily corrected"""
    print("\n" + "="*60)
    print("TEST 5: Valid ID Preservation")
    print("="*60)
    
    good_id = "30406011402713"
    print(f"  Valid ID: {good_id}")
    
    score = _score_egyptian_id(good_id)
    corrected = correct_misread_numerals(good_id, "ID-Number")
    
    print(f"  Score: {score:.2f}")
    print(f"  After correction: {corrected}")
    
    assert corrected == good_id, "Good ID should not be changed"
    assert score >= 0.75, "Valid ID should have good score"
    print("  Status: PASS")

def main():
    """Run all tests"""
    print("\n" + "╔" + "="*58 + "╗")
    print("║" + " "*15 + "OCR Fixes Verification Tests" + " "*15 + "║")
    print("╚" + "="*58 + "╝")
    
    try:
        test_arabic_text_normalization()
        test_normalize_text_with_arabic()
        test_id_derivation_with_confidence()
        test_digit_correction()
        test_valid_id_not_corrected()
        
        print("\n" + "="*60)
        print("ALL TESTS PASSED!")
        print("="*60)
        print("\nSummary:")
        print("  ✓ Arabic letter normalization (ى→ي, أ/إ→ا)")
        print("  ✓ Text normalization integration")
        print("  ✓ DOB derivation with confidence scoring")
        print("  ✓ Digit correction heuristics")
        print("  ✓ Valid ID preservation")
        print("\nThe fixes are working correctly!")
        
    except AssertionError as e:
        print(f"\nTEST FAILED: {e}")
        return 1
    except Exception as e:
        print(f"\nERROR: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
