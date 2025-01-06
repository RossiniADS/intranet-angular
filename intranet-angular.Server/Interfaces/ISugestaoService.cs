using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface ISugestaoService
    {
        Task<IEnumerable<SugestaoResponse>> GetAllAsync();
        Task<SugestaoResponse?> GetByIdAsync(int id);
        Task<SugestaoResponse> AddAsync(SugestaoRequest cardapio);
        Task<SugestaoResponse> UpdateAsync(int id, SugestaoRequest cardapio);
        Task DeleteAsync(int id);
    }
}
