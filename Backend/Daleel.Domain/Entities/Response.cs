using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Domain.Entities
{
    public class Response : BaseEntity<int>
    {
        public int RequestId { get; set; }
        public Request Request { get; set; } = default!;

        public string Content { get; set; } = default!;

        public DateTime ReceivedAt { get; set; }
    }
}
