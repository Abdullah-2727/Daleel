using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.QueryParams
{
    public class ServiceCenterQueryParams : BaseQueryParams
    {
        public int? MinistryId { get; set; }
        public string? City { get; set; }
    }
}
