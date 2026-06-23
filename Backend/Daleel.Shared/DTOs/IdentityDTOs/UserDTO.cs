using Daleel.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.DTOs.IdentityDTOs
{
    public class UserDTO
    {
        public string Id { get; set; } = default!;
        public string FullName { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string NationalId { get; set; } = default!;
        public DateOnly DateOfBirth { get; set; }
        public string PhoneNumber { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Occupation { get; set; } = default!;
        public Gender Gender { get; set; }
        public ReligiousStatus ReligiousStatus { get; set; }
        public MaritalStatus MaritalStatus { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
