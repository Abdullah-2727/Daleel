using Daleel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.ServiceSpecifications
{
    public class ServiceByNameSpecification : BaseSpecifications<Service, int>
    {
        public ServiceByNameSpecification(string serviceName)
            : base(s => s.Name == serviceName)
        { }
    }
}
