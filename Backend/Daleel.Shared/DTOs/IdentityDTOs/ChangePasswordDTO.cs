using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Daleel.Shared.DTOs.IdentityDTOs
{
    public class ChangePasswordDTO
    {
        [Required]
        public string CurrentPassword { get; set; } = default!;
        [Required, MinLength(6)]
        public string NewPassword { get; set; } = default!;
    }
}
