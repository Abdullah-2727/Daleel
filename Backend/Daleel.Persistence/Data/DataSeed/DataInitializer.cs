using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Text.Json;

namespace Daleel.Persistence.Data.DataSeed
{
    public class DataInitializer : IDataInitializer
    {
        private readonly DaleelDbContext _dbContext;
        private readonly ILogger<DataInitializer> _logger;

        public DataInitializer(DaleelDbContext dbContext, ILogger<DataInitializer> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        // Bogus seeding
        ///public async Task InitializeAsync()
        ///{
        ///    await using var transaction = await _dbContext.Database.BeginTransactionAsync(IsolationLevel.Serializable);
        ///    
        ///    try
        ///    {
        ///        if (await _dbContext.Ministries.AnyAsync())
        ///        {
        ///            await transaction.RollbackAsync();
        ///            return;
        ///        }
        ///    
        ///        var ministryFaker = new MinistryFaker();
        ///        List<Ministry> ministries = ministryFaker.UseSeed(1234).Generate(5);
        ///        _dbContext.Ministries.AddRange(ministries);
        ///        await _dbContext.SaveChangesAsync();
        ///    
        ///        int[] ministryIds = ministries.Select(m => m.Id).ToArray();
        ///    
        ///        var serviceFaker = new ServiceFaker(ministryIds);
        ///        List<Service> services = serviceFaker.UseSeed(1234).Generate(20);
        ///        _dbContext.Services.AddRange(services);
        ///    
        ///        var serviceCenterFaker = new ServiceCenterFaker(ministryIds);
        ///        List<ServiceCenter> serviceCenters = serviceCenterFaker.UseSeed(1234).Generate(10);
        ///        _dbContext.ServiceCenters.AddRange(serviceCenters);
        ///    
        ///        await _dbContext.SaveChangesAsync();
        ///    
        ///        await transaction.CommitAsync();
        ///    }
        ///    catch (Exception ex)
        ///    {
        ///        await transaction.RollbackAsync();
        ///        _logger.LogError(ex, "Error occurred during data seeding");
        ///        throw;
        ///    }
        ///
        ///}

        public async Task InitializeAsync()
        {
            try
            {
                var hasMinistries = await _dbContext.Ministries.AnyAsync();
                var hasServices = await _dbContext.Services.AnyAsync();
                var hasServiceCenters = await _dbContext.ServiceCenters.AnyAsync();

                if (hasMinistries && hasServices && hasServiceCenters)
                    return;

                if (!hasMinistries)
                {
                    await SeedDataFromJson<Ministry, int>(
                        "ministries.json",
                        _dbContext.Ministries
                    );
                }

                if (!hasServices)
                {
                    await SeedDataFromJson<Service, int>(
                        "services.json",
                        _dbContext.Services
                    );
                }

                await _dbContext.SaveChangesAsync();

                if (!hasServiceCenters)
                {
                    await SeedDataFromJson<ServiceCenter, int>(
                        "service-centers.json",
                        _dbContext.ServiceCenters
                    );
                }

                await _dbContext.SaveChangesAsync();

                _logger.LogInformation("Data initialization completed successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during data seeding");
                throw;
            }
        }

        private async Task SeedDataFromJson<T, TKey>(string fileName, DbSet<T> dbSet)
            where T : BaseEntity<TKey>
        {
            var filePath = Path.Combine(
                AppContext.BaseDirectory,
                "Data",
                "DataSeed",
                "JsonFiles",
                fileName
            );

            if (!File.Exists(filePath))
            {
                _logger.LogWarning($"Json file not found: {filePath}");
                throw new FileNotFoundException("Json file not found", filePath);
            }

            try
            {
                await using var dataStream = File.OpenRead(filePath);

                var data = await JsonSerializer.DeserializeAsync<List<T>>(
                    dataStream,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                );

                if (data is not null && data.Count > 0)
                {
                    await dbSet.AddRangeAsync(data);
                    _logger.LogInformation($"Seeded {data.Count} records from {fileName}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error while reading data from Json: {fileName}");
                throw;
            }
        }
    }
}