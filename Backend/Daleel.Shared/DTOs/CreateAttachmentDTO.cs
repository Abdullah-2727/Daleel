using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs
{
    public class CreateAttachmentDTO
    {
        public IFormFile File { get; set; } = default!;
        public string FileName { get; set; } = default!;
        public string UserId { get; set; } = default!;
    }
}
