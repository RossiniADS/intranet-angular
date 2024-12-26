using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface ICategoriaService
    {
        Task<IEnumerable<CategoriaResponse>> GetAllAsync();
        Task<IEnumerable<CategoriaResponse>> GetQtdNoticiaPorCategoria();
        Task<CategoriaResponse?> GetByIdAsync(int id);
        Task<CategoriaResponse> AddAsync(CategoriaRequest categoria);
        Task<CategoriaResponse> UpdateAsync(int id, CategoriaRequest categoria);
        Task DeleteAsync(int id);
    }
}
