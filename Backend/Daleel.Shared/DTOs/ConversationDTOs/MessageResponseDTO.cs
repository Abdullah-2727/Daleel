using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.ConversationDTOs
{
    public class MessageResponseDTO
    {
        public string BotResponse { get; set; } = default!;
        public string? CollectedData { get; set; }
        public bool IsReadyToConfirm { get; set; }
        public List<string>? MissingFields { get; set; }
        public string? DetectedServiceName { get; set; }
    }
}
