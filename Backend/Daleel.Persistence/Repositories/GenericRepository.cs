using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Persistence.Repositories
{
    public class GenericRepository<TEntity, TKey> : IGenericRepository<TEntity, TKey>
        where TEntity : BaseEntity<TKey>
    {
        private readonly DaleelDbContext _dbContext;

        public GenericRepository(DaleelDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync() => await _dbContext.Set<TEntity>().ToListAsync();

        public async Task<IEnumerable<TEntity>> GetAllAsync(ISpecifications<TEntity, TKey> specifications)
        {
            var query = SpecificationEvaluator.CreateQuery(_dbContext.Set<TEntity>(), specifications);

            return await query.ToListAsync();
        }

        public async Task<TEntity?> GetByIdAsync(TKey id) => await _dbContext.Set<TEntity>().FindAsync(id);

        public Task<TEntity?> GetByIdAsync(ISpecifications<TEntity, TKey> specifications)
        {
            var query = SpecificationEvaluator.CreateQuery(_dbContext.Set<TEntity>(), specifications);

            return query.FirstOrDefaultAsync();
        }

        public async Task CreateAsync(TEntity entity)
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);
        }

        public void Update(TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);
        }

        public void Delete(TEntity entity)
        {
            _dbContext.Set<TEntity>().Remove(entity);
        }

        public async Task<int> CountAsync(ISpecifications<TEntity, TKey> specifications)
        {
            return await SpecificationEvaluator.CreateQuery(_dbContext.Set<TEntity>(), specifications).CountAsync();
        }
    }
}
