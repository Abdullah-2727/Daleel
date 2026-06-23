using Daleel.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Data.Configurations
{
    public class MinistryConfigurations : IEntityTypeConfiguration<Ministry>
    {
        public void Configure(EntityTypeBuilder<Ministry> builder)
        {
        }
    }
}
