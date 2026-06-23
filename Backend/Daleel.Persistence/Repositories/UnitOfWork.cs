using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DaleelDbContext _dbContext;

        private readonly Dictionary<Type, object> _repositories = [];

        public UnitOfWork(DaleelDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>()
            where TEntity : BaseEntity<TKey>
        {
            var entityType = typeof(TEntity);

            if (_repositories.TryGetValue(entityType, out var repository))
                return (IGenericRepository<TEntity, TKey>)repository;

            var newRepo = new GenericRepository<TEntity, TKey>(_dbContext);

            _repositories[entityType] = newRepo;

            return newRepo;
        }

        public async Task<int> SaveChangesAsync() => await _dbContext.SaveChangesAsync();
    }
}
