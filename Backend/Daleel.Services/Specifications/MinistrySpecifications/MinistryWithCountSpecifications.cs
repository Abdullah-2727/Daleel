using Daleel.Domain.Entities;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.MinistrySpecifications
{
    public class MinistryWithCountSpecifications : BaseSpecifications<Ministry, int>
    {
        public MinistryWithCountSpecifications(BaseQueryParams baseQueryParams) 
            : base(m => (string.IsNullOrEmpty(baseQueryParams.Search) || m.Name.Contains(baseQueryParams.Search)))
        {
        }
    }
}
