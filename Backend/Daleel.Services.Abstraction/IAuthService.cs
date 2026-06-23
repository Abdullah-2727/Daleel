using Daleel.Shared.DTOs.IdentityDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> RegisterAsync(RegisterDTO dto);

        Task<AuthResponseDTO> LoginAsync(LoginDTO dto);

        Task<AuthResponseDTO> RefreshTokenAsync(string refreshToken);

        Task LogoutAsync(string refreshToken);

        ///Task ChangePasswordAsync(string userId, string currentPassword, string newPassword);

        Task ForgotPasswordAsync(ForgotPasswordDTO dto);

        Task ResetPasswordAsync(ResetPasswordDTO dto);

        Task RequestOtpAsync(RequestOtpDTO dto);

        Task<bool> VerifyOtpAsync(VerifyOtpDTO dto);
    }
}
