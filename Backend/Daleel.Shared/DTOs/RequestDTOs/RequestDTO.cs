using Daleel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.RequestDTOs
{
    public class RequestDTO
    {
        public int Id { get; set; }
        public string ServiceName { get; set; } = default!;
        public string? RequestData { get; set; }
        public RequestStatus Status { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ResponseDTO? Response { get; set; }
    }
}
