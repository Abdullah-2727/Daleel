using Daleel.Domain.Entities;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.ServiceSpecifications
{
    public class ServiceWithMinistrySpecifications : BaseSpecifications<Service, int>
    {
        public ServiceWithMinistrySpecifications(ServiceQueryParams serviceQueryParams) 
            : base(s => 
                  (!serviceQueryParams.MinistryId.HasValue || s.MinistryId == serviceQueryParams.MinistryId.Value) &&
                  (string.IsNullOrEmpty(serviceQueryParams.Search) || s.Name.Contains(serviceQueryParams.Search)))
        {
            AddInclude(S => S.Ministry);

            ApplyPagination(serviceQueryParams.PageSize, serviceQueryParams.PageIndex);
        }

        public ServiceWithMinistrySpecifications(int id) 
            : base(s => s.Id == id)
        {
            AddInclude(S => S.Ministry);
        }
    }
}
