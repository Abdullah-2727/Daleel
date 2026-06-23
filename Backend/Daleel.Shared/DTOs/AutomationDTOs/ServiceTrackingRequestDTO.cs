using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.AutomationDTOs
{
    public class ServiceTrackingRequestDTO
    {
        public string ServiceName { get; set; } = default!;
        public string SubmittedAt { get; set; } = default!;
    }
}
