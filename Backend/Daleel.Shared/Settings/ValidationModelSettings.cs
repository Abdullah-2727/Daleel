using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.Settings
{
    public class ValidationModelSettings
    {
        public string ModelApiUrl { get; set; } = default!;

        // Critical thresholds
        public double IdCardMinConfidence { get; set; } = 0.90;
        public double NationalIdMinConfidence { get; set; } = 0.80;
        public double MinOverallScore { get; set; } = 0.75;

        // Weights
        public double IdCardWeight { get; set; } = 0.30;
        public double NationalIdWeight { get; set; } = 0.25;
        public double FullNameWeight { get; set; } = 0.20;
        public double DateOfBirthWeight { get; set; } = 0.15;
        public double AddressWeight { get; set; } = 0.10;
    }
}
