using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.AutomationDTOs
{
    public class ServiceExecutionResponseDTO
    {
        public bool Success { get; set; }
        ///public string? ErrorMessage { get; set; }
        public string? Content { get; set; }
        public string? SubmittedAt { get; set; }
    }
}
