using Daleel.Domain.Entities;
using Daleel.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Daleel.Persistence.Data
{
    public class DaleelDbContext : IdentityDbContext<ApplicationUser>
    {
        public DaleelDbContext(DbContextOptions<DaleelDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public DbSet<Service> Services { get; set; }
        public DbSet<Ministry> Ministries { get; set; }
        public DbSet<ServiceCenter> ServiceCenters { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Response> Responses { get; set; }
    }
}