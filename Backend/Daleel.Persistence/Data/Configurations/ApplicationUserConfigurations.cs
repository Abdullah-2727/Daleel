using Daleel.Domain.Entities;
using Daleel.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using static Bogus.DataSets.Name;

namespace Daleel.Persistence.Data.Configurations
{
    public class ApplicationUserConfigurations : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {

            builder.Property(u => u.FullName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.NationalId)
                .IsRequired()
                .HasMaxLength(14);

            builder.HasIndex(u => u.NationalId)
                .IsUnique();

            builder.Property(u => u.DateOfBirth) 
                .IsRequired();

            builder.Property(u => u.Address)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(u => u.Occupation)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.Gender)
                .IsRequired()
                .HasConversion(
                    (gender) => gender.ToString(),
                    (gender) => Enum.Parse<Domain.Entities.Identity.Gender>(gender)
                    );

            builder.Property(u => u.ReligiousStatus)
                .IsRequired()
                .HasConversion(
                    (religiousStatus) => religiousStatus.ToString(),
                    (religiousStatus) => Enum.Parse<ReligiousStatus>(religiousStatus)
                    );

            builder.Property(u => u.MaritalStatus)
                .IsRequired()
                .HasConversion(
                    (maritalStatus) => maritalStatus.ToString(),
                    (maritalStatus) => Enum.Parse<MaritalStatus>(maritalStatus)
                    );

            builder.Property(u => u.ProfilePictureUrl)
                .HasMaxLength(500);

            builder.Property(u => u.CreatedAt)
                .IsRequired();

            builder.Property(u => u.UpdatedAt)
                .IsRequired();

            builder.ToTable("Users");

        }
    }
}
