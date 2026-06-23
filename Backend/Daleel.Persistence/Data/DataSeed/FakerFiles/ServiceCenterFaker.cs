using Bogus;
using Daleel.Domain.Entities;

namespace Daleel.Persistence.Data.DataSeed;

public sealed class ServiceCenterFaker : Faker<ServiceCenter>
{
    public ServiceCenterFaker(int[] ministryIds) : base("ar")
    {
        RuleFor(sc => sc.Name, f => f.Company.CompanyName() + " مركز");
        RuleFor(sc => sc.Description, f => f.Lorem.Sentence(8));
        RuleFor(sc => sc.Address, f => f.Address.FullAddress());
        RuleFor(sc => sc.City, f => f.Address.City());
        RuleFor(sc => sc.Latitude, f => Math.Round((decimal)f.Address.Latitude(20, 30), 6));
        RuleFor(sc => sc.Longitude, f => Math.Round((decimal)f.Address.Longitude(36, 50), 6));
        RuleFor(sc => sc.OperatingHours, f => f.PickRandom("8ص-4م", "9ص-5م", "7ص-3م", "24/7"));
        RuleFor(sc => sc.MinistryId, f => f.PickRandom(ministryIds));
    }
}
