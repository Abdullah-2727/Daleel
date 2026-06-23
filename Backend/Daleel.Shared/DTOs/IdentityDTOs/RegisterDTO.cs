using Daleel.Domain.Entities.Identity;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text;

namespace Daleel.Shared.DTOs.IdentityDTOs
{
    public class RegisterDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; } = default!;
        [Required]
        public string Password { get; set; } = default!;

        [Required]
        public string FullName { get; set; } = default!;
        [Required]
        public string Address { get; set; } = default!;
        [Required]
        public string NationalId { get; set; } = default!;
        [Required]
        public DateOnly DateOfBirth { get; set; }
        [Required]
        public string PhoneNumber { get; set; } = default!;

        [Required]
        public string Occupation { get; set; } = default!;
        [Required]
        public Gender Gender { get; set; }
        [Required]
        public ReligiousStatus ReligiousStatus { get; set; }
        [Required]
        public MaritalStatus MaritalStatus { get; set; }

        public IFormFile? ProfilePicture { get; set; }

        [Required]
        public IFormFile IdCardImage { get; set; } = default!;
    }
}
