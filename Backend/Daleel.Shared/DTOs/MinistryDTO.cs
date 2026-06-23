using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs
{
    public class MinistryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string WebsiteUrl { get; set; } = default!;
    }
}
