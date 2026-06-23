using Daleel.Domain.Entities;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.MinistrySpecifications
{
    public class MinistrySpecifications : BaseSpecifications<Ministry, int>
    {
        public MinistrySpecifications(BaseQueryParams baseQueryParams) 
            : base(m => (string.IsNullOrEmpty(baseQueryParams.Search) || m.Name.Contains(baseQueryParams.Search)))
        {
            ApplyPagination(baseQueryParams.PageSize, baseQueryParams.PageIndex);
        }
    }
}
