using AutoMapper;
using Daleel.Domain.Entities.Identity;
using Daleel.Services.Abstraction;
using Daleel.Shared.DTOs;
using Daleel.Shared.DTOs.IdentityDTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Daleel.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly IEmailService _emailService;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IAttachmentService _attachmentService;
        private readonly IMapper _mapper;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config, IEmailService emailService, ICloudinaryService cloudinaryService, IAttachmentService attachmentService, IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
            _emailService = emailService;
            _cloudinaryService = cloudinaryService;
            _attachmentService = attachmentService;
            _mapper = mapper;
        }

        public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO dto)
        {
            var existingUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
                throw new Exception("Email already exists");

            var user = _mapper.Map<ApplicationUser>(dto);

            if (dto.ProfilePicture != null)
                user.ProfilePictureUrl = await _cloudinaryService.UploadImageAsync(
                    dto.ProfilePicture, "users/profile-pictures");

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                throw new Exception(string.Join(", ",
                    result.Errors.Select(e => e.Description)));

            await EnsureRoleExistsAsync("User");
            await _userManager.AddToRoleAsync(user, "User");

            await _attachmentService.CreateAttachmentAsync(new CreateAttachmentDTO
            {
                File = dto.IdCardImage,
                FileName = "صورة البطاقة",
                UserId = user.Id
            });

            return await GenerateAuthResponse(user);
        }

        public async Task<AuthResponseDTO> LoginAsync(LoginDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
                throw new Exception("Invalid email or password");

            return await GenerateAuthResponse(user);
        }

        public async Task<AuthResponseDTO> RefreshTokenAsync(string refreshToken)
        {
            var user = _userManager.Users
                .FirstOrDefault(u => u.RefreshToken == refreshToken
                    && u.RefreshTokenExpiryTime > DateTime.UtcNow);

            if (user == null)
                throw new Exception("Invalid or expired refresh token");

            return await GenerateAuthResponse(user);
        }

        public async Task LogoutAsync(string refreshToken)
        {
            var user = _userManager.Users
                .FirstOrDefault(u => u.RefreshToken == refreshToken);

            if (user != null)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = null;
                await _userManager.UpdateAsync(user);
            }
        }

        //public async Task ChangePasswordAsync(string userId, string currentPassword, string newPassword)
        //{
        //    var user = await _userManager.FindByIdAsync(userId);
        //    if (user == null)
        //        throw new Exception("User not found");
        //
        //    var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
        //    if (!result.Succeeded)
        //        throw new Exception(string.Join(", ",
        //            result.Errors.Select(e => e.Description)));
        //}

        public async Task ForgotPasswordAsync(ForgotPasswordDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                throw new Exception("User not found");

            var otp = GenerateOtp();
            user.OtpCode = otp;
            user.OtpPurpose = "ForgotPassword";
            user.OtpExpiry = DateTime.UtcNow.AddMinutes(10);
            await _userManager.UpdateAsync(user);

            await _emailService.SendEmailAsync(
                dto.Email,
                "Reset Your Password - Daleel",
                $"<h2>Your OTP Code</h2><p>Your OTP is: <strong>{otp}</strong></p><p>Valid for 10 minutes.</p>"
            );
        }

        public async Task ResetPasswordAsync(ResetPasswordDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                throw new Exception("User not found");

            if (user.OtpCode != dto.OtpCode ||
                user.OtpPurpose != "ForgotPassword" ||
                user.OtpExpiry < DateTime.UtcNow)
                throw new Exception("Invalid or expired OTP");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, dto.NewPassword);
            if (!result.Succeeded)
                throw new Exception(string.Join(", ",
                    result.Errors.Select(e => e.Description)));

            user.OtpCode = null;
            user.OtpPurpose = null;
            user.OtpExpiry = null;
            await _userManager.UpdateAsync(user);
        }

        public async Task RequestOtpAsync(RequestOtpDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                throw new Exception("User not found");

            var otp = GenerateOtp();
            user.OtpCode = otp;
            user.OtpPurpose = dto.Purpose;
            user.OtpExpiry = DateTime.UtcNow.AddMinutes(10);
            await _userManager.UpdateAsync(user);

            await _emailService.SendEmailAsync(
                dto.Email,
                "Your OTP Code - Daleel",
                $"<h2>Your OTP Code</h2><p>Your OTP is: <strong>{otp}</strong></p><p>Valid for 10 minutes.</p>"
            );
        }

        public async Task<bool> VerifyOtpAsync(VerifyOtpDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                throw new Exception("User not found");

            if (user.OtpCode != dto.OtpCode ||
                user.OtpPurpose != dto.Purpose ||
                user.OtpExpiry < DateTime.UtcNow)
                return false;

            user.OtpCode = null;
            user.OtpPurpose = null;
            user.OtpExpiry = null;
            await _userManager.UpdateAsync(user);

            return true;
        }

        #region Helper Methods

        private async Task EnsureRoleExistsAsync(string roleName)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
                await _roleManager.CreateAsync(new IdentityRole(roleName));
        }

        private async Task<AuthResponseDTO> GenerateAuthResponse(ApplicationUser user)
        {
            var token = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            return new AuthResponseDTO
            {
                Token = token,
                RefreshToken = refreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(
                    double.Parse(_config["Jwt:DurationInMinutes"]!)),
                User = _mapper.Map<UserDTO>(user)
            };
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Name, user.FullName),
            };

            var roles = _userManager.GetRolesAsync(user).Result;
            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    double.Parse(_config["Jwt:DurationInMinutes"]!)),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var bytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            return Convert.ToBase64String(bytes);
        }

        private string GenerateOtp()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        #endregion
    }
}
