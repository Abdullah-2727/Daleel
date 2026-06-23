using Daleel.Domain.Entities;
using Daleel.Shared;
using Daleel.Shared.DTOs.RequestDTOs;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IRequestService
    {
        Task<RequestDTO> SubmitRequestAsync(Conversation conversation,Service service,string userId/*, IEnumerable<Attachment> attachments*/);

        Task<RequestDTO> GetRequestAsync(int requestId, string userId);

        Task<PaginatedResult<RequestDTO>> GetUserRequestsAsync(string userId, RequestQueryParams requestQueryParams);

        Task<ResponseDTO?> GetResponseAsync(int requestId, string userId);
    }
}
