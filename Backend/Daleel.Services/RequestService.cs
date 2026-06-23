using AutoMapper;
using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Services.Abstraction;
using Daleel.Services.Specifications;
using Daleel.Services.Specifications.RequestSpecifications;
using Daleel.Shared;
using Daleel.Shared.DTOs.RequestDTOs;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services
{
    public class RequestService : IRequestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAutomationService _automationService;
        ///private readonly IAttachmentRepository _attachmentRepository;

        public RequestService(IUnitOfWork unitOfWork,IMapper mapper,IAutomationService automationService/*, IAttachmentRepository attachmentRepository*/)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _automationService = automationService;
            ///_attachmentRepository = attachmentRepository;
        }

        public async Task<RequestDTO> SubmitRequestAsync(Conversation conversation,Service service,string userId/*, IEnumerable<Attachment> attachments*/)
        {
            // Create Request (Pending)
            var request = new Request
            {
                UserId = userId,
                ConversationId = conversation.Id,
                ServiceId = conversation.ServiceId!.Value,
                RequestData = conversation.CollectedData,
                Status = RequestStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _unitOfWork.GetRepository<Request, int>().CreateAsync(request);
            await _unitOfWork.SaveChangesAsync();

            // Execute automation
            await _automationService.ExecuteAsync(
                request,
                service,
                userId
                ///attachments
                );

            return _mapper.Map<RequestDTO>(request);
        }

        public async Task<RequestDTO> GetRequestAsync(int requestId, string userId)
        {
            ///var request = await _unitOfWork
            ///    .GetRepository<Request, int>()
            ///    .GetByIdAsync(requestId);
            ///
            ///if (request == null)
            ///    throw new KeyNotFoundException("Request not found.");
            ///
            ///if (request.UserId != userId)
            ///    throw new UnauthorizedAccessException("Not your request.");
            ///
            ///return _mapper.Map<RequestDTO>(request);

            var spec = new RequestWithServiceAndResponseSpecification(requestId, userId);
            var request = await _unitOfWork
                .GetRepository<Request, int>()
                .GetByIdAsync(spec);

            if (request == null)
                throw new KeyNotFoundException("Request not found.");

            return _mapper.Map<RequestDTO>(request);
        }

        public async Task<PaginatedResult<RequestDTO>> GetUserRequestsAsync(string userId, RequestQueryParams requestQueryParams)
        {
            ///var all = await _unitOfWork
            ///    .GetRepository<Request, int>()
            ///    .GetAllAsync();
            ///
            ///return _mapper.Map<IEnumerable<RequestDTO>>(
            ///    all.Where(r => r.UserId == userId));

            var spec = new RequestWithServiceAndResponseSpecification(userId, requestQueryParams);
            var countSpec = new RequestWithCountSpecification(userId, requestQueryParams);

            var requests = await _unitOfWork
                .GetRepository<Request, int>()
                .GetAllAsync(spec);

            var totalCount = await _unitOfWork
                .GetRepository<Request, int>()
                .CountAsync(countSpec);

            var data = _mapper.Map<IEnumerable<RequestDTO>>(requests);

            return new PaginatedResult<RequestDTO>(
                requestQueryParams.PageIndex,
                requestQueryParams.PageSize,
                totalCount,
                data);
        }

        public async Task<ResponseDTO?> GetResponseAsync(int requestId, string userId)
        {
            // Find request with service + response included
            var spec = new RequestWithServiceAndResponseSpecification(requestId, userId);
            var request = await _unitOfWork
                .GetRepository<Request, int>()
                .GetByIdAsync(spec);

            if (request == null)
                throw new KeyNotFoundException("Request not found.");

            if (request.Response != null)
                return _mapper.Map<ResponseDTO>(request.Response);

            if (request.Status != RequestStatus.Processing)
                return null;

            // Processing + no response → call automation tracking
            var trackResult = await _automationService.TrackResponseAsync(
                request.Service.Name,
                request.CreatedAtOnDEP!);

            // Content arrived → save Response + update request (Completed)
            if (!string.IsNullOrEmpty(trackResult.Content))
            {
                request.Status = RequestStatus.Completed;
                request.UpdatedAt = DateTime.UtcNow;

                var response = new Response
                {
                    RequestId = request.Id,
                    Content = trackResult.Content,
                    ReceivedAt = DateTime.UtcNow
                };

                await _unitOfWork.GetRepository<Response, int>()
                    .CreateAsync(response);

                _unitOfWork.GetRepository<Request, int>().Update(request);
                await _unitOfWork.SaveChangesAsync();

                return _mapper.Map<ResponseDTO>(response);
            }

            // Content null → not ready yet
            return null;
        }
    }
}

