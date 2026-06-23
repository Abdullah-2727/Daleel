using Daleel.API.Extensions;
using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Domain.Entities.Identity;
using Daleel.Persistence.Data;
using Daleel.Persistence.Data.DataSeed;
using Daleel.Persistence.Repositories;
using Daleel.Services;
using Daleel.Services.Abstraction;
using Daleel.Services.MappingProfiles;
using Daleel.Shared.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;

namespace Daleel.API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            #region Dependency injection container

            // Add services to the container.

            builder.Services.AddControllers();
            ///builder.Services.AddControllers()
            ///    .AddJsonOptions(options =>
            ///    {
            ///        options.JsonSerializerOptions.PropertyNamingPolicy =
            ///            JsonNamingPolicy.CamelCase;
            ///    });
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            ///builder.Services.AddOpenApi();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<DaleelDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IAttachmentRepository, AttachmentRepository>();

            builder.Services.AddAutoMapper(X => X.AddProfile<ServiceProfile>());
            builder.Services.AddAutoMapper(X => X.AddProfile<MinistryProfile>());
            builder.Services.AddAutoMapper(X => X.AddProfile<ServiceCenterProfile>());
            builder.Services.AddAutoMapper(X => X.AddProfile<AuthProfile>());
            builder.Services.AddAutoMapper(X => X.AddProfile<ConversationProfile>());
            builder.Services.AddAutoMapper(X => X.AddProfile<RequestProfile>());
            
            builder.Services.AddScoped<IServiceService, ServiceService>();
            builder.Services.AddScoped<IMinistryService, MinistryService>();
            builder.Services.AddScoped<IServiceCenterService, ServiceCenterService>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IEmailService, EmailService>();
            builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();
            builder.Services.AddHttpClient<IValidationModelService, ValidationModelService>();
            builder.Services.AddScoped<IAttachmentService, AttachmentService>();
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services.AddScoped<IConversationService, ConversationService>();
            builder.Services.AddHttpClient<IRagService, RagService>();
            builder.Services.AddScoped<IRequestService, RequestService>();
            builder.Services.AddHttpClient<IAutomationService, AutomationService>(client =>
            {
                client.Timeout = TimeSpan.FromSeconds(180);
            });


            builder.Services.AddKeyedScoped<IDataInitializer, DataInitializer>("Default");


            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
               .AddEntityFrameworkStores<DaleelDbContext>()
               .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
                };
            });

            builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
            builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
            builder.Services.Configure<ValidationModelSettings>(builder.Configuration.GetSection("ValidationModelSettings"));
            builder.Services.Configure<RagSettings>(builder.Configuration.GetSection("RagSettings"));
            builder.Services.Configure<AutomationSettings>(builder.Configuration.GetSection("AutomationSettings"));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(
                    "DevelopmentPolicy",
                    builder =>
                    {
                        builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
                    }
                );
            });

            #endregion

            var app = builder.Build();

            await app.MigrateDatabaseAsync();

            await app.SeedDataAsync();

            #region Pipeline configuration

            // Configure the HTTP request pipeline.

            if (app.Environment.IsDevelopment())
            {
                ///app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseCors("DevelopmentPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            #endregion

            await app.RunAsync();
        }
    }
}
