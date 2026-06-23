using Bogus;
using Daleel.Domain.Entities;

namespace Daleel.Persistence.Data.DataSeed;

public sealed class ServiceFaker : Faker<Service>
{
    public ServiceFaker(int[] ministryIds) : base("ar")
    {
        RuleFor(s => s.Name, f => f.Commerce.ProductName());
        RuleFor(s => s.Description, f => f.Lorem.Sentence(12));
        RuleFor(s => s.WhoCanApply, f => f.PickRandom("مواطنين", "مقيمين", "شركات", "الجميع"));
        RuleFor(s => s.RequiredDocuments, f => f.Make(f.Random.Int(1, 4), () => f.Lorem.Word()));
        RuleFor(s => s.Fee, f => f.Finance.Amount(0, 500));
        RuleFor(s => s.EstimatedTime, f => f.PickRandom("يوم", "أيام 3", "أيام 5", "أيام 7"));
        RuleFor(s => s.MinistryId, f => f.PickRandom(ministryIds));
    }
}
