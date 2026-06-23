using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.ServiceCenterDTOs
{
    public class ServiceCenterDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string City { get; set; } = default!;
        public string OperatingHours { get; set; } = default!;

        public string Ministry { get; set; } = default!;
    }
}
