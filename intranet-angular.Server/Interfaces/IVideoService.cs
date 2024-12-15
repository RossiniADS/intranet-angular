using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IVideoService
    {
        Task<IEnumerable<Video>> GetAllAsync();
        Task<Video> GetByIdAsync(Guid id);
        Task AddAsync(Video slide);
        Task UpdateAsync(Video slide);
        Task DeleteAsync(Guid id);
    }
}
