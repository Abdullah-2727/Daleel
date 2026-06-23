using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.RagDTOs
{
    public class ChatResponseDTO
    {
        public string BotResponse { get; set; } = default!;
        public string? ServiceName { get; set; }
        public Dictionary<string, string>? CollectedData { get; set; }
        public bool IsReadyToConfirm { get; set; }
        public List<string>? MissingFields { get; set; }
    }
}
