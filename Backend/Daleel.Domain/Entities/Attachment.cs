using Daleel.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Domain.Entities
{
    public class Attachment
    {
        public string FileName { get; set; } = default!;
        public string FileUrl { get; set; } = default!;
        public DateTime UploadedAt { get; set; }

        public string UserId { get; set; } = default!;
        ///public ApplicationUser User { get; set; } = default!;
    }
}
