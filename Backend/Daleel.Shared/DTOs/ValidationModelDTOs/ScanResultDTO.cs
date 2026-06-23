using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.ValidationModelDTOs
{
    public class ScanResultDTO
    {
        public bool IsReliable { get; set; }
        public double OverallScore { get; set; }

        public string FullName { get; set; } = default!;
        public string NationalId { get; set; } = default!;
        public DateOnly DateOfBirth { get; set; } = default!;
        public string Address { get; set; } = default!;
    }
}
