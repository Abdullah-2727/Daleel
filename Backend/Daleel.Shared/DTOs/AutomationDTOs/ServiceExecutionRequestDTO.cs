using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.AutomationDTOs
{
    public class ServiceExecutionRequestDTO
    {
        public string ServiceName { get; set; } = default!;
        public string? RequestData { get; set; }
        ///public List<AttachmentInfoDTO> Attachments { get; set; } = new();
    }

    ///public class AttachmentInfoDTO
    ///{
    ///    public string FileName { get; set; } = default!;
    ///    public string FileUrl { get; set; } = default!;
    ///}
}
