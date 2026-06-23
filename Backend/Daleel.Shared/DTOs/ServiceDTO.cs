using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs
{
    public class ServiceDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string WhoCanApply { get; set; } = default!;
        public List<string> RequiredDocuments { get; set; } = new();
        public List<string> TermsAndConditions { get; set; } = [];
        public decimal Fee { get; set; }
        public string EstimatedTime { get; set; } = default!;

        public string Ministry { get; set; } = default!;

        public List<string> SimilarServices { get; set; } = [];
    }
}
