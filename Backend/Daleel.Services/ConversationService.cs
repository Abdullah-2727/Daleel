using AutoMapper;
using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Services.Abstraction;
using Daleel.Services.Specifications;
using Daleel.Services.Specifications.ServiceSpecifications;
using Daleel.Shared.DTOs.ConversationDTOs;
using Daleel.Shared.DTOs.RagDTOs;
using Daleel.Shared.DTOs.RequestDTOs;
using Daleel.Shared.Settings;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace Daleel.Services
{
    public class ConversationService : IConversationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IRagService _ragService;
        private readonly IRequestService _requestService;
        ///private readonly IAttachmentService _attachmentService;

        public ConversationService(IUnitOfWork unitOfWork,IMapper mapper,IRagService ragService,IRequestService requestService/*, IAttachmentService attachmentService*/)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _ragService = ragService;
            _requestService = requestService;
            ///_attachmentService = attachmentService;
        }

        public async Task<ConversationDTO> StartConversationAsync(string userId)
        {
            var conversation = new Conversation
            {
                UserId = userId,
                Messages = "[]",
                Status = ConversationStatus.Active,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _unitOfWork.GetRepository<Conversation, int>()
                .CreateAsync(conversation);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ConversationDTO>(conversation);
        }

        public async Task<MessageResponseDTO> SendMessageAsync(int conversationId, string userId, SendMessageDTO dto)
        {
            var conversation = await GetAndValidateAsync(conversationId, userId);

            if (conversation.Status == ConversationStatus.Confirmed)
                throw new InvalidOperationException(
                    "Conversation already confirmed. Start a new one.");

            // Handle attachments if any
            ///if (dto.Attachments != null && dto.Attachments.Any())
            ///{
            ///    foreach (var attachment in dto.Attachments)
            ///    {
            ///        await _attachmentService.CreateAttachmentAsync(
            ///            new CreateAttachmentDTO
            ///            {
            ///                File = attachment.File,
            ///                FileName = attachment.FileName,
            ///                UserId = userId
            ///            });
            ///    }
            ///}

            // Call RAG
            var ragResponse = await _ragService.ChatAsync(new ChatRequestDTO
            {
                ConversationId = conversationId,
                UserId = userId,
                Message = dto.Message,
                History = conversation.Messages
            });

            // Append to messages history
            var messages = JsonSerializer
                .Deserialize<List<object>>(conversation.Messages)
                ?? new List<object>();

            messages.Add(new
            {
                role = "user",
                content = dto.Message,
                timestamp = DateTime.UtcNow
            });
            messages.Add(new
            {
                role = "assistant",
                content = ragResponse.BotResponse,
                timestamp = DateTime.UtcNow
            });

            // Merge collected data
            if (ragResponse.CollectedData != null && ragResponse.CollectedData.Any())
            {
                var existing = string.IsNullOrEmpty(conversation.CollectedData)
                    ? new Dictionary<string, string>()
                    : JsonSerializer.Deserialize<Dictionary<string, string>>(
                        conversation.CollectedData) ?? new();

                foreach (var item in ragResponse.CollectedData)
                    existing[item.Key] = item.Value;

                conversation.CollectedData = JsonSerializer.Serialize(existing);
            }

            // Resolve service name → id
            if (!string.IsNullOrEmpty(ragResponse.ServiceName))
            {
                conversation.DetectedServiceName = ragResponse.ServiceName;

                var spec = new ServiceByNameSpecification(ragResponse.ServiceName);
                var service = await _unitOfWork
                    .GetRepository<Service, int>()
                    .GetByIdAsync(spec);

                if (service != null)
                    conversation.ServiceId = service.Id;
            }

            // Validate + normalize JSON before saving
            conversation.Messages = ValidateAndNormalizeJson(
                JsonSerializer.Serialize(messages));

            if (!string.IsNullOrEmpty(conversation.CollectedData))
                conversation.CollectedData = ValidateAndNormalizeJson(
                    conversation.CollectedData);

            conversation.UpdatedAt = DateTime.UtcNow;
            _unitOfWork.GetRepository<Conversation, int>().Update(conversation);
            await _unitOfWork.SaveChangesAsync();

            return new MessageResponseDTO
            {
                BotResponse = ragResponse.BotResponse,
                CollectedData = conversation.CollectedData,
                IsReadyToConfirm = ragResponse.IsReadyToConfirm,
                MissingFields = ragResponse.MissingFields,
                DetectedServiceName = conversation.DetectedServiceName
            };
        }

        public async Task<RequestDTO> ConfirmServiceAsync(int conversationId, string userId)
        {
            var conversation = await GetAndValidateAsync(conversationId, userId);

            if (conversation.Status == ConversationStatus.Confirmed)
                throw new InvalidOperationException("Already confirmed.");

            if (!conversation.ServiceId.HasValue)
                throw new InvalidOperationException(
                    "Service not detected yet. Keep chatting.");

            var service = await _unitOfWork
                .GetRepository<Service, int>()
                .GetByIdAsync(conversation.ServiceId.Value);

            if (service == null)
                throw new KeyNotFoundException("Service not found.");

            // Validate required attachments if any
            ///IEnumerable<Attachment> userAttachments = new List<Attachment>();
            ///if (service.RequiredDocuments != null && service.RequiredDocuments.Any())
            ///{
            ///    userAttachments = await _attachmentService
            ///        .GetUserAttachmentsAsync(userId);
            ///
            ///    var uploadedNames = userAttachments
            ///        .Select(a => a.FileName)
            ///        .ToList();
            ///
            ///    var missingDocs = service.RequiredDocuments
            ///        .Where(doc => !uploadedNames.Contains(doc))
            ///        .ToList();
            ///
            ///    if (missingDocs.Any())
            ///        throw new InvalidOperationException(
            ///            $"Missing documents: {string.Join(", ", missingDocs)}");
            ///}

            // Mark conversation confirmed
            conversation.Status = ConversationStatus.Confirmed;
            conversation.UpdatedAt = DateTime.UtcNow;
            _unitOfWork.GetRepository<Conversation, int>().Update(conversation);
            await _unitOfWork.SaveChangesAsync();

            // Delegate to RequestService
            return await _requestService.SubmitRequestAsync(
                conversation,
                service,
                userId
                ///userAttachments
                );
        }

        public async Task<ConversationDTO> GetConversationAsync(int conversationId, string userId)
        {
            var conversation = await GetAndValidateAsync(conversationId, userId);
            return _mapper.Map<ConversationDTO>(conversation);
        }

        public async Task<IEnumerable<ConversationDTO>> GetUserConversationsAsync(string userId)
        {
            ///var all = await _unitOfWork
            ///    .GetRepository<Conversation, int>()
            ///    .GetAllAsync();
            ///
            ///return _mapper.Map<IEnumerable<ConversationDTO>>(
            ///    all.Where(c => c.UserId == userId));

            var spec = new ConversationByUserIdSpecification(userId);
            var conversations = await _unitOfWork
                .GetRepository<Conversation, int>()
                .GetAllAsync(spec);

            return _mapper.Map<IEnumerable<ConversationDTO>>(conversations);
        }

        public async Task DeleteConversationAsync(int conversationId, string userId)
        {
            var conversation = await GetAndValidateAsync(conversationId, userId);

            ///if (conversation.Status == ConversationStatus.Confirmed)
            ///    throw new InvalidOperationException(
            ///        "Cannot delete a confirmed conversation.");

            _unitOfWork.GetRepository<Conversation, int>().Delete(conversation);
            await _unitOfWork.SaveChangesAsync();
        }

        #region Helper Methods

        private async Task<Conversation> GetAndValidateAsync(int conversationId, string userId)
        {
            ///var conversation = await _unitOfWork
            ///    .GetRepository<Conversation, int>()
            ///    .GetByIdAsync(conversationId);
            ///
            ///if (conversation == null)
            ///    throw new KeyNotFoundException("Conversation not found.");
            ///
            ///if (conversation.UserId != userId)
            ///    throw new UnauthorizedAccessException("Not your conversation.");
            ///
            ///return conversation;

            var spec = new ConversationByUserIdSpecification(conversationId, userId);
            var conversation = await _unitOfWork
                .GetRepository<Conversation, int>()
                .GetByIdAsync(spec);

            if (conversation == null)
                throw new KeyNotFoundException("Conversation not found.");

            return conversation;
        }

        private string ValidateAndNormalizeJson(string json)
        {
            try
            {
                var parsed = JsonSerializer.Deserialize<object>(json);
                return JsonSerializer.Serialize(parsed);
            }
            catch (JsonException)
            {
                throw new InvalidOperationException($"Invalid JSON: {json}");
            }
        }

        #endregion
    }
}
