using Daleel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.QueryParams
{
    public class RequestQueryParams : BaseQueryParams
    {
        public RequestStatus? Status { get; set; }
        public bool IsDescending { get; set; } = true;
    }
}
