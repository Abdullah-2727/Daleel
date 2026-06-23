using Daleel.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Data.Configurations
{
    public class ConversationConfigurations : IEntityTypeConfiguration<Conversation>
    {
        public void Configure(EntityTypeBuilder<Conversation> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.UserId).IsRequired();

            builder.Property(c => c.Messages)
                .IsRequired()
                .HasColumnType("jsonb");

            builder.Property(c => c.CollectedData)
                .HasColumnType("jsonb");

            builder.Property(c => c.DetectedServiceName)
                .HasMaxLength(200);

            builder.Property(c => c.Status)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(r => r.CreatedAt)
                 .IsRequired();

            builder.Property(r => r.UpdatedAt)
                .IsRequired();

            builder.HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(c => c.Service)
                .WithMany()
                .HasForeignKey(c => c.ServiceId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(c => c.Request)
                .WithOne(r => r.Conversation)
                .HasForeignKey<Request>(r => r.ConversationId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.ToTable("Conversations");
        }
    }
}
