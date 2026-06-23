using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using MailKit.Search;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Daleel.Services.Specifications
{
    public abstract class BaseSpecifications<TEntity, TKey> : ISpecifications<TEntity, TKey>
        where TEntity : BaseEntity<TKey>
    {
        public ICollection<Expression<Func<TEntity, object>>> IncludeExpressions { get; } = [];

        protected void AddInclude(Expression<Func<TEntity, object>> includeExp)
        {
            IncludeExpressions.Add(includeExp);
        }

        public Expression<Func<TEntity, bool>> Criteria { get; }

        protected BaseSpecifications(Expression<Func<TEntity, bool>> criteriaExp)
        {
            Criteria = criteriaExp;
        }

        public Expression<Func<TEntity, object>>? OrderBy { get; private set; }
        public Expression<Func<TEntity, object>>? OrderByDescending { get; private set; }

        protected void AddOrderBy(Expression<Func<TEntity, object>> orderByExp)
        {
            OrderBy = orderByExp;
        }

        protected void AddOrderByDescending(Expression<Func<TEntity, object>> orderByDescendingExp)
        {
            OrderByDescending = orderByDescendingExp;
        }

        public int Skip { private set; get; }
        public int Take { private set; get; }
        public bool IsPaginated { private set; get; }

        protected void ApplyPagination(int pageSize, int pageIndex)
        {
            IsPaginated = true;
            Skip = (pageIndex - 1) * pageSize;
            Take = pageSize;
        }
    }
}
