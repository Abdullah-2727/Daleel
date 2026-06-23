using Daleel.Domain.Entities;
using Daleel.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IAttachmentService
    {
        Task CreateAttachmentAsync(CreateAttachmentDTO dto);

        ///Task<IEnumerable<Attachment>> GetUserAttachmentsAsync(string userId);
    }
}
