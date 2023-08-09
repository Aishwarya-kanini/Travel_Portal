using System.Threading.Tasks;
using System.Collections.Generic;

namespace Big_Bang3_Assessment.Repositories
{
    public interface IFeedBackRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(int id);
        Task<TEntity> AddAsync(TEntity entity);
        Task UpdateAsync(int id, TEntity entity);
        Task DeleteAsync(int id);
    }
}
