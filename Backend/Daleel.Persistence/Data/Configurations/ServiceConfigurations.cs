using Daleel.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Data.Configurations
{
    public class ServiceConfigurations : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.Property(s => s.Fee)
                .HasPrecision(10, 2);

            builder.HasOne(s => s.Ministry)
                .WithMany()
                .HasForeignKey(s => s.MinistryId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
