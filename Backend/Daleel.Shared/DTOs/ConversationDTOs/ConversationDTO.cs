using Daleel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.ConversationDTOs
{
    public class ConversationDTO
    {
        public int Id { get; set; }
        public string Messages { get; set; } = default!;
        public string? CollectedData { get; set; }
        public string? DetectedServiceName { get; set; }
        public int? ServiceId { get; set; }
        public ConversationStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
