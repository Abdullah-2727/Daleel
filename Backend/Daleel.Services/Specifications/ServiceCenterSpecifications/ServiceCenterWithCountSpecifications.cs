using Daleel.Domain.Entities;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.ServiceCenterSpecifications
{
    public class ServiceCenterWithCountSpecifications : BaseSpecifications<ServiceCenter, int>
    {
        public ServiceCenterWithCountSpecifications(ServiceCenterQueryParams serviceCenterQueryParams) 
            : base(sc =>
                  (!serviceCenterQueryParams.MinistryId.HasValue || sc.MinistryId == serviceCenterQueryParams.MinistryId.Value) &&
                  (string.IsNullOrEmpty(serviceCenterQueryParams.City) || sc.City == serviceCenterQueryParams.City) &&
                  (string.IsNullOrEmpty(serviceCenterQueryParams.Search) || sc.Name.Contains(serviceCenterQueryParams.Search)))
        {
        }
    }
}
