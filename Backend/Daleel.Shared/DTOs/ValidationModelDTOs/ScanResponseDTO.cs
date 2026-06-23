using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.ValidationModelDTOs
{
    public class ScanResponseDTO
    {
        public OcrDataDTO Ocr { get; set; } = default!;
        public ValidationDataDTO Validation { get; set; } = default!;
    }

    public class OcrDataDTO
    {
        public string FullName { get; set; } = default!;
        public string NationalId { get; set; } = default!;
        public string DateOfBirth { get; set; } = default!;
        public string Address { get; set; } = default!;
    }

    public class ValidationDataDTO
    {
        public double IdCard { get; set; }
        public double FullName { get; set; }
        public double NationalId { get; set; }
        public double DateOfBirth { get; set; }
        public double Address { get; set; }
    }
}
