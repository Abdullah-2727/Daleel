using Daleel.Shared.DTOs.IdentityDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IAccountService
    {
        Task<UserDTO> GetProfileAsync(string userId);

        Task ChangePasswordAsync(string userId, string currentPassword, string newPassword);

        Task DeleteAccountAsync(string userId);
    }
}
