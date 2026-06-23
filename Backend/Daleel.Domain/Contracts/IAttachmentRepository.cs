using Daleel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Domain.Contracts
{
    public interface IAttachmentRepository
    {
        Task CreateAsync(Attachment attachment);

        ///Task<IEnumerable<Attachment>> GetAllByUserIdAsync(string userId);
    }
}
