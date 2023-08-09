using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bb3Gallery.Repositories
{
    public interface IGalleryRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(int id);
        Task<TEntity> AddAsync(TEntity entity);
        Task UpdateAsync(int id, TEntity entity);
        Task DeleteAsync(int id);
    }
}
