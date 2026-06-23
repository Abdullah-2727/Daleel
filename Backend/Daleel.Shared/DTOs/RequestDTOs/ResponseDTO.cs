using Daleel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.RequestDTOs
{
    public class ResponseDTO
    {
        public int RequestId { get; set; }
        public string? Content { get; set; }
        public DateTime ReceivedAt { get; set; }
    }
}
