using Daleel.Domain.Entities;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.ServiceSpecifications
{
    public class ServiceWithCountSpecifications : BaseSpecifications<Service, int>
    {
        public ServiceWithCountSpecifications(ServiceQueryParams serviceQueryParams) 
            : base(s =>
                  (!serviceQueryParams.MinistryId.HasValue || s.MinistryId == serviceQueryParams.MinistryId.Value) &&
                  (string.IsNullOrEmpty(serviceQueryParams.Search) || s.Name.Contains(serviceQueryParams.Search)))
        {
        }
    }
}
