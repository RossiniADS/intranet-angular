using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface ISlideService
    {
        Task<IEnumerable<Slide>> GetAllAsync();
        Task<Slide> GetByIdAsync(int id);
        Task AddAsync(Slide slide);
        Task UpdateAsync(Slide slide);
        Task DeleteAsync(int id);
    }
}
