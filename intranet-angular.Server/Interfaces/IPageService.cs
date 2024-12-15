using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IPageService
    {
        Task<IEnumerable<Page>> GetAllAsync();
        Task<Page> GetByIdAsync(Guid id);
        Task<Page> CreateAsync(Page page);
        Task<Page> UpdateAsync(Page page);
        Task<bool> DeleteAsync(Guid id);
    }
}
