using Daleel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.RequestSpecifications
{
    public class RequestByConversationIdSpecification : BaseSpecifications<Request, int>
    {
        public RequestByConversationIdSpecification(int conversationId)
            : base(r => r.ConversationId == conversationId) { }
    }
}
