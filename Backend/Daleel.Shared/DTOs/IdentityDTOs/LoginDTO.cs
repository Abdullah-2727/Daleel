using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Daleel.Shared.DTOs.IdentityDTOs
{
    public class LoginDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; } = default!;
        [Required]
        public string Password { get; set; } = default!;
    }
}
