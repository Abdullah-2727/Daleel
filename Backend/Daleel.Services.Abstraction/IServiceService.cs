using Daleel.Shared;
using Daleel.Shared.DTOs;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IServiceService
    {
        Task<PaginatedResult<ServiceDTO>> GetAllServicesAsync(ServiceQueryParams serviceQueryParams);

        Task<ServiceDTO> GetServiceByIdAsync(int id);
    }
}
