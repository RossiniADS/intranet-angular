using intranet_angular.Server.Entities;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface IPaginaService
    {
        Task<IEnumerable<PaginaResponse>> GetAllAsync();
        Task<PaginaResponse?> GetByIdAsync(int id);
        Task<PaginaResponse> AddAsync(PaginaRequest paginaRequest);
        Task<PaginaResponse> UpdateAsync(int id, PaginaRequest paginaRequest);
        Task DeleteAsync(int id);
    }
}
