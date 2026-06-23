using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Daleel.Shared.DTOs.ConversationDTOs
{
    public class SendMessageDTO
    {
        [Required]
        public string Message { get; set; } = default!;
        ///public List<AttachmentUploadDTO>? Attachments { get; set; }
    }

    ///public class AttachmentUploadDTO
    ///{
    ///    public IFormFile File { get; set; } = default!;
    ///    public string FileName { get; set; } = default!;
    ///}
}
