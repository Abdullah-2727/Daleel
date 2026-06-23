using Daleel.Shared;
using Daleel.Shared.DTOs;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IMinistryService
    {
        Task<PaginatedResult<MinistryDTO>> GetAllMinistriesAsync(BaseQueryParams baseQueryParams);

        Task<MinistryDTO> GetMinistryByIdAsync(int id);
    }
}
