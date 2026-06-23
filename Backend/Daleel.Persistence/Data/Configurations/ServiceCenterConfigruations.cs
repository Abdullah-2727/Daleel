using Daleel.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Data.Configurations
{
    public class ServiceCenterConfigruations : IEntityTypeConfiguration<ServiceCenter>
    {
        public void Configure(EntityTypeBuilder<ServiceCenter> builder)
        {
            builder.Property(sc => sc.Latitude)
                .HasPrecision(9, 6);

            builder.Property(sc => sc.Longitude)
                .HasPrecision(9, 6);

            builder.HasOne(sc => sc.Ministry)
                .WithMany()
                .HasForeignKey(sc => sc.MinistryId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
