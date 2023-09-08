using Core.Entities.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq.Expressions;

namespace PassBox.Core.Data.Concrete;

public class EfEntityRepositoryBase<TEntity> : IEntityRepository<TEntity> where TEntity : class, IEntity, new()
{
    private readonly DbContext _context;

    public EfEntityRepositoryBase(DbContext context)
    {
        _context = context;
    }

    public async Task<TEntity> AddAsync(TEntity entity)
    {
        await _context.Set<TEntity>().AddAsync(entity);
        return entity;
    }

    public async Task<TEntity> UpdateAsync(TEntity entity)
    {       
        EntityEntry entityEntry = _context.Entry(entity);
        entityEntry.State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(TEntity entity)
    {//Remove bir async metod olmadığından bu Task işlemini biz sağladık
        await Task.Run(() => { _context.Set<TEntity>().Remove(entity); });
    }

    public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await _context.Set<TEntity>().AnyAsync(predicate);
    }   

    public async Task<IList<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate = null, params Expression<Func<TEntity, object>>[] includeProperties)
    {
        IQueryable<TEntity> query = _context.Set<TEntity>();
        if (predicate != null)
        {
            query = query.Where(predicate);
        }

        if (includeProperties.Any())
        {
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
        }
        return await query.AsNoTracking().ToListAsync();
    }
    
    public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeProperties)
    {
        IQueryable<TEntity> query = _context.Set<TEntity>();
        if (predicate != null)
        {
            query = query.Where(predicate);
        }

        if (includeProperties.Any())
        {
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
        }
        return await query.AsNoTracking().SingleOrDefaultAsync();     
    }
  
    public IQueryable<TEntity> GetAsQueryable()
    {       
        return _context.Set<TEntity>().AsQueryable();
    }   
}
