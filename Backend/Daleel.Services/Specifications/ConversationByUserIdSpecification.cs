using Daleel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications
{
    public class ConversationByUserIdSpecification : BaseSpecifications<Conversation, int>
    {
        public ConversationByUserIdSpecification(string userId)
            : base(c => c.UserId == userId)
        { }

        public ConversationByUserIdSpecification(int conversationId, string userId)
            : base(c => c.Id == conversationId && c.UserId == userId)
        { }
    }
}
