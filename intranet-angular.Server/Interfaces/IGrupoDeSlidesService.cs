using intranet_angular.Server.Entities;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface IGrupoDeSlidesService
    {
        Task<IEnumerable<GrupoDeSlideResponse>> GetAllAsync();
        Task<GrupoDeSlideResponse?> GetByIdAsync(int id);
        Task<List<GrupoDeSlideResponse>> AddAsync(List<GrupoDeSlideRequest> grupoDeSlideRequest);
        Task<GrupoDeSlideResponse> UpdateAsync(int id, GrupoDeSlideRequest grupoDeSlideRequest);
        Task DeleteAsync(int id);
    }
}
