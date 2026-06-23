using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence
{
    internal static class SpecificationEvaluator
    {
        public static IQueryable<TEntity> CreateQuery<TEntity, TKey>(IQueryable<TEntity> entryPoint, ISpecifications<TEntity, TKey> specifications) where TEntity : BaseEntity<TKey>
        {
            var query = entryPoint;

            if (specifications is not null)
            {
                if (specifications.Criteria is not null)
                {
                    query = query.Where(specifications.Criteria);
                }
                if (specifications.IncludeExpressions is not null && specifications.IncludeExpressions.Any())
                {
                    query = specifications.IncludeExpressions.Aggregate(query, (currentQuery, includeExp) => currentQuery.Include(includeExp));
                }
                if (specifications.OrderBy is not null)
                {
                    query = query.OrderBy(specifications.OrderBy);
                }
                if (specifications.OrderByDescending is not null)
                {
                    query = query.OrderByDescending(specifications.OrderByDescending);
                }
                if (specifications.IsPaginated == true)
                {
                    query = query.Skip(specifications.Skip).Take(specifications.Take);
                }
            }

            return query;
        }
    }
}
