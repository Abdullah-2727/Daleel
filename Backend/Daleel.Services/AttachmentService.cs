using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Services.Abstraction;
using Daleel.Shared.DTOs;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services
{
    public class AttachmentService : IAttachmentService
    {
        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _env;

        public AttachmentService(IAttachmentRepository attachmentRepository, IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            _attachmentRepository = attachmentRepository;
            _unitOfWork = unitOfWork;
            _env = env;
        }

        public async Task CreateAttachmentAsync(CreateAttachmentDTO dto)
        {
            // Check if an attachment with the same name already exists for the user (Until we can detect the expiration date to replace)
            ///var existing = await _attachmentRepository.GetAllByUserIdAsync(dto.UserId);
            ///var alreadyExists = existing.Any(a => a.FileName == dto.FileName);
            ///
            ///if (alreadyExists)
            ///    return;

            var extension = Path.GetExtension(dto.File.FileName);

            // wwwroot/attachments/{arabic name}/{userId}/img.extension
            var folder = Path.Combine(
                _env.WebRootPath,
                "attachments",
                dto.FileName,
                dto.UserId);

            Directory.CreateDirectory(folder);

            var physicalFileName = $"img{extension}";
            var fullPath = Path.Combine(folder, physicalFileName);

            // Save file
            await using var stream = new FileStream(fullPath, FileMode.Create);
            await dto.File.CopyToAsync(stream);


            var fileUrl = $"/attachments/{dto.FileName}/{dto.UserId}/{physicalFileName}";

            var attachment = new Attachment
            {
                FileName = dto.FileName,
                FileUrl = fileUrl,
                UploadedAt = DateTime.UtcNow,
                UserId = dto.UserId
            };

            await _attachmentRepository.CreateAsync(attachment);
            await _unitOfWork.SaveChangesAsync();
        }

        ///public async Task<IEnumerable<Attachment>> GetUserAttachmentsAsync(string userId)
        ///{
        ///    return await _attachmentRepository.GetAllByUserIdAsync(userId);
        ///}
    }
}
