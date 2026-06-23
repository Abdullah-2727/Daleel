using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Daleel.Shared.DTOs.ValidationModelDTOs
{
    public class ScanRequestDTO
    {
        [Required]
        public IFormFile IdCardImage { get; set; } = default!;
    }
}
