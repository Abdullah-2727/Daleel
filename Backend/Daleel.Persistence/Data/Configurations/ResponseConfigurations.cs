using Daleel.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Data.Configurations
{
    public class ResponseConfigurations : IEntityTypeConfiguration<Response>
    {
        public void Configure(EntityTypeBuilder<Response> builder)
        {
            builder.HasKey(r => r.Id);

            builder.Property(r => r.Content)
                .IsRequired();

            builder.Property(r => r.ReceivedAt)
                .IsRequired();

            builder.HasOne(r => r.Request)
                .WithOne(r => r.Response)
                .HasForeignKey<Response>(r => r.RequestId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("Responses");
        }
    }
}
