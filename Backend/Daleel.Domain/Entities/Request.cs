using Daleel.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Domain.Entities
{
    public class Request : BaseEntity<int>
    {
        public string UserId { get; set; } = default!;
        public ApplicationUser User { get; set; } = default!;

        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; } = default!;

        public int ServiceId { get; set; }
        public Service Service { get; set; } = default!;

        public string? RequestData { get; set; } 
        public RequestStatus Status { get; set; } = RequestStatus.Pending;
        public string? Note { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public string? CreatedAtOnDEP { get; set; }
        public Response? Response { get; set; }
    }

    public enum RequestStatus
    {
        Pending,
        Processing,
        Completed,
        Failed
    }
}
