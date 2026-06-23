using Daleel.Domain.Entities;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.ServiceCenterSpecifications
{
    public class ServiceCenterWithMinistrySpecifications : BaseSpecifications<ServiceCenter, int>
    {
        public ServiceCenterWithMinistrySpecifications(ServiceCenterQueryParams serviceCenterQueryParams) 
            : base(sc =>
                  (!serviceCenterQueryParams.MinistryId.HasValue || sc.MinistryId == serviceCenterQueryParams.MinistryId.Value) &&
                  (string.IsNullOrEmpty(serviceCenterQueryParams.City) || sc.City == serviceCenterQueryParams.City) &&
                  (string.IsNullOrEmpty(serviceCenterQueryParams.Search) || sc.Name.Contains(serviceCenterQueryParams.Search)))
        {
            AddInclude(SC => SC.Ministry);

            ApplyPagination(serviceCenterQueryParams.PageSize, serviceCenterQueryParams.PageIndex);
        }

        public ServiceCenterWithMinistrySpecifications(int id) 
            : base(sc => sc.Id == id)
        {
            AddInclude(SC => SC.Ministry);
        }
    }
}
