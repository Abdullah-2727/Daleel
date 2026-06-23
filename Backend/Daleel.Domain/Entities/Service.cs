using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Domain.Entities
{
    public class Service : BaseEntity<int>
    {
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string WhoCanApply { get; set; } = default!;
        public List<string> RequiredDocuments { get; set; } = [];
        public List<string> TermsAndConditions { get; set; } = [];
        public decimal Fee { get; set; }
        public string EstimatedTime { get; set; } = default!;

        public int MinistryId { get; set; }
        public Ministry Ministry { get; set; } = null!;

        public List<string> SimilarServices { get; set; } = [];
    }
}
