using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Repositories
{
    public class AttachmentRepository : IAttachmentRepository
    {
        private readonly DaleelDbContext _dbContext;

        public AttachmentRepository(DaleelDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateAsync(Attachment attachment)
        {
            await _dbContext.Attachments.AddAsync(attachment);
        }

        ///public async Task<IEnumerable<Attachment>> GetAllByUserIdAsync(string userId)
        ///{
        ///    return await _dbContext.Attachments
        ///        .Where(a => a.UserId == userId)
        ///        .ToListAsync();
        ///}
    }
}
