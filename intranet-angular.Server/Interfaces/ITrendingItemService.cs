using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface ITrendingItemService
    {
        Task<IEnumerable<TrendingItem>> GetAllAsync();
        Task<TrendingItem> GetByIdAsync(Guid id);
        Task AddAsync(TrendingItem trendingItem);
        Task UpdateAsync(TrendingItem trendingItem);
        Task DeleteAsync(Guid id);
    }
}
