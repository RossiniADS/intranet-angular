using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface INewsItemService
    {
        Task<IEnumerable<NewsItem>> GetAllAsync();
        Task<NewsItem> GetByIdAsync(Guid id);
        Task AddAsync(NewsItem newsItem);
        Task UpdateAsync(NewsItem newsItem);
        Task DeleteAsync(Guid id);
    }
}
