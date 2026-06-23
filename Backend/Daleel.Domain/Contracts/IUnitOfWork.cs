using Daleel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Domain.Contracts
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();

        IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() 
            where TEntity : BaseEntity<TKey>;
    }
}
