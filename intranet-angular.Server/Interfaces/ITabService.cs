using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface ITabService
    {
        Task<IEnumerable<Tab>> GetAllAsync();
        Task<Tab> GetByIdAsync(Guid id);
        Task AddAsync(Tab tab);
        Task UpdateAsync(Tab tab);
        Task DeleteAsync(Guid id);
    }
}
