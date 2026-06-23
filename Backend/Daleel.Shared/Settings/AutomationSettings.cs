using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.Settings
{
    public class AutomationSettings
    {
        public string ExecuteApiUrl { get; set; } = default!;
        public string TrackingApiUrl { get; set; } = default!;
        public string? ApiKey { get; set; }
    }
}
