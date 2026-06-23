using Daleel.Domain.Entities;
using Daleel.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Data.Configurations
{
    public class AttachmentConfigurations : IEntityTypeConfiguration<Attachment>
    {
        public void Configure(EntityTypeBuilder<Attachment> builder)
        {
            // Composite Key
            builder.HasKey(a => new { a.UserId, a.FileName });

            builder.Property(a => a.FileName)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(a => a.FileUrl)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(a => a.UploadedAt)
                .IsRequired();

            builder.HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("Attachments");
        }
    }
}
