using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.IdentityDTOs
{
    public class AuthResponseDTO
    {
        public string Token { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
        public DateTime ExpiresAt { get; set; }
        public UserDTO User { get; set; } = default!;
    }
}
