using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.RagDTOs
{
    public class ChatRequestDTO
    {
        public int ConversationId { get; set; }
        public string UserId { get; set; } = default!;
        public string Message { get; set; } = default!;
        public string History { get; set; } = default!;
    }
}
