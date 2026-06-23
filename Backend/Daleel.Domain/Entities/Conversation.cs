using Daleel.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Domain.Entities
{
    public class Conversation : BaseEntity<int>
    {
        public string UserId { get; set; } = default!;
        public ApplicationUser User { get; set; } = default!;

        public string Messages { get; set; } = "[]";
        public string? CollectedData { get; set; }
        public string? DetectedServiceName { get; set; }
        public int? ServiceId { get; set; } 
        public Service? Service { get; set; }

        public ConversationStatus Status { get; set; } = ConversationStatus.Active;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Request? Request { get; set; }
    }

    public enum ConversationStatus
    {
        Active,
        Confirmed, 
        Closed
    }
}
