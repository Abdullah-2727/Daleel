using Daleel.Domain.Contracts;
using Daleel.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace Daleel.API.Extensions
{
    public static class WebApplicationRegister
    {
        public static async Task<WebApplication> MigrateDatabaseAsync(this WebApplication app)
        {
            await using var scope = app.Services.CreateAsyncScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<DaleelDbContext>();

            var pendingMigrations = await dbContext.Database.GetPendingMigrationsAsync();

            if (pendingMigrations.Any())
                await dbContext.Database.MigrateAsync();

            return app;
        }

        public static async Task<WebApplication> SeedDataAsync(this WebApplication app)
        {
            await using var scope = app.Services.CreateAsyncScope();

            var dataSeeder = scope.ServiceProvider.GetRequiredKeyedService<IDataInitializer>(
                "Default"
            );

            await dataSeeder.InitializeAsync();

            return app;
        }
    }
}
