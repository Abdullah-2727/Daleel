using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Daleel.Shared.DTOs.IdentityDTOs
{
    public class ForgotPasswordDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; } = default!;
    }

    public class ResetPasswordDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; } = default!;
        [Required]
        public string OtpCode { get; set; } = default!;
        [Required, MinLength(6)]
        public string NewPassword { get; set; } = default!;
    }

    public class RequestOtpDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; } = default!;
        [Required]
        public string Purpose { get; set; } = default!;
    }

    public class VerifyOtpDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; } = default!;
        [Required]
        public string OtpCode { get; set; } = default!;
        [Required]
        public string Purpose { get; set; } = default!;
    }
}
