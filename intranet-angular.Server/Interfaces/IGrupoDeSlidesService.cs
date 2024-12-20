using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IGrupoDeSlidesService
    {
        Task<IEnumerable<GrupoDeSlides>> GetAllAsync();
        Task<GrupoDeSlides> GetByIdAsync(int id);
        Task AddAsync(GrupoDeSlides slide);
        Task UpdateAsync(GrupoDeSlides slide);
        Task DeleteAsync(int id);
    }
}
