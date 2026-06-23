using Bogus;
using Daleel.Domain.Entities;

namespace Daleel.Persistence.Data.DataSeed;

public sealed class MinistryFaker : Faker<Ministry>
{
    public MinistryFaker() : base("ar")
    {
        RuleFor(m => m.Name, f => f.Company.CompanyName() + " وزارة");
        RuleFor(m => m.Description, f => f.Lorem.Sentence(10));
        RuleFor(m => m.WebsiteUrl, f => f.Internet.Url());
    }
}
