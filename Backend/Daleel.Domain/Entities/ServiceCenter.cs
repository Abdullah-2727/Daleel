using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Domain.Entities
{
    public class ServiceCenter : BaseEntity<int>
    {
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string City { get; set; } = default!;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string OperatingHours { get; set; } = default!;

        public int MinistryId { get; set; }
        public Ministry Ministry { get; set; } = null!;
    }
}
