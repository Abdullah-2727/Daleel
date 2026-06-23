using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Daleel.Domain.Entities.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = default!;
        public string NationalId { get; set; } = default!;
        public DateOnly DateOfBirth { get; set; }
        public string Address { get; set; } = default!;

        public string Occupation { get; set; } = default!;
        public Gender Gender { get; set; }
        public ReligiousStatus ReligiousStatus { get; set; }
        public MaritalStatus MaritalStatus { get; set; }

        public string? ProfilePictureUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public string? OtpCode { get; set; }
        public string? OtpPurpose { get; set; }
        public DateTime? OtpExpiry { get; set; }

        ///public ICollection<Attachment> Attachments { get; set; } = [];
    }
}
