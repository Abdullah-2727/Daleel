using Daleel.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Data.Configurations
{
    public class RequestConfigurations : IEntityTypeConfiguration<Request>
    {
        public void Configure(EntityTypeBuilder<Request> builder)
        {
            builder.HasKey(r => r.Id);
            builder.Property(r => r.UserId).IsRequired();

            builder.Property(r => r.RequestData)
                .HasColumnType("jsonb");

            builder.Property(r => r.Status)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(r => r.Note)
                .HasMaxLength(500);

            builder.Property(r => r.CreatedAt)
                .IsRequired();

            builder.Property(r => r.UpdatedAt)
                .IsRequired();

            builder.Property(r=> r.CreatedAtOnDEP)
                .HasMaxLength(100);

            builder.HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(r => r.Service)
                .WithMany()
                .HasForeignKey(r => r.ServiceId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.ToTable("Requests");
        }
    }
}
