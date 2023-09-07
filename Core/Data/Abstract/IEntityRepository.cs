using Core.Entities.Abstract;
using System.Linq.Expressions;

namespace PassBox.Core.Data;

public interface IEntityRepository<T> where T : class, IEntity, new()
{
    Task<T> GetAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
    //Task<T?> GetAsync(
    //  Expression<Func<T, bool>> predicate,
    //  Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null,     
    //  CancellationToken cancellationToken = default);
    Task<IList<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includeProperties);
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);//true ya da false dönecek. hiç var mı? sorusunun cevabıdır    
    IQueryable<T> GetAsQueryable();
}
