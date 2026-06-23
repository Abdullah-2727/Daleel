using Daleel.Shared.DTOs.ConversationDTOs;
using Daleel.Shared.DTOs.RequestDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IConversationService
    {
        Task<ConversationDTO> StartConversationAsync(string userId);

        Task<MessageResponseDTO> SendMessageAsync(int conversationId, string userId, SendMessageDTO dto);

        Task<RequestDTO> ConfirmServiceAsync(int conversationId, string userId);

        Task<ConversationDTO> GetConversationAsync(int conversationId, string userId);

        Task<IEnumerable<ConversationDTO>> GetUserConversationsAsync(string userId);

        Task DeleteConversationAsync(int conversationId, string userId);
    }
}
