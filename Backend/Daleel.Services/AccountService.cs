using AutoMapper;
using Daleel.Domain.Entities.Identity;
using Daleel.Services.Abstraction;
using Daleel.Shared.DTOs.IdentityDTOs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IWebHostEnvironment _env;

        public AccountService(UserManager<ApplicationUser> userManager, IMapper mapper, ICloudinaryService cloudinaryService, IWebHostEnvironment env)
        {
            _userManager = userManager;
            _mapper = mapper;
            _cloudinaryService = cloudinaryService;
            _env = env;
        }

        public async Task<UserDTO> GetProfileAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                throw new KeyNotFoundException("User not found");

            return _mapper.Map<UserDTO>(user);
        }

        public async Task ChangePasswordAsync(string userId, string currentPassword, string newPassword)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                throw new KeyNotFoundException("User not found");

            var result = await _userManager.ChangePasswordAsync(
                user, currentPassword, newPassword);

            if (!result.Succeeded)
                throw new Exception(string.Join(", ",
                    result.Errors.Select(e => e.Description)));
        }

        public async Task DeleteAccountAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                throw new KeyNotFoundException("User not found");

            if (!string.IsNullOrEmpty(user.ProfilePictureUrl))
            {
                var uri = new Uri(user.ProfilePictureUrl);
                var segments = uri.AbsolutePath.Split('/');
                var uploadIndex = Array.IndexOf(segments, "upload");
                if (uploadIndex >= 0 && uploadIndex + 2 < segments.Length)
                {
                    var publicIdWithExtension = string.Join("/",
                        segments.Skip(uploadIndex + 2));
                    var publicId = Path.GetFileNameWithoutExtension(publicIdWithExtension);
                    var folder = Path.GetDirectoryName(publicIdWithExtension)
                        ?.Replace("\\", "/");
                    var fullPublicId = string.IsNullOrEmpty(folder)
                        ? publicId
                        : $"{folder}/{publicId}";

                    await _cloudinaryService.DeleteImageAsync(fullPublicId);
                }
            }

            var idCardFolder = Path.Combine(
                _env.WebRootPath,
                "attachments",
                "صورة البطاقة",
                userId);

            if (Directory.Exists(idCardFolder))
                Directory.Delete(idCardFolder, recursive: true); // ← deletes {userId} folder

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                throw new Exception(string.Join(", ",
                    result.Errors.Select(e => e.Description)));
        }
    }
}
