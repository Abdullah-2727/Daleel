using Daleel.Shared;
using Daleel.Shared.DTOs.ServiceCenterDTOs;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IServiceCenterService
    {
        Task<PaginatedResult<ServiceCenterDTO>> GetAllServiceCentersAsync(ServiceCenterQueryParams serviceCenterQueryParams);

        Task<ServiceCenterDTO> GetServiceCenterByIdAsync(int id);

        Task<ServiceCenterLocationDTO> GetServiceCenterLocationAsync(int id);
    }
}
