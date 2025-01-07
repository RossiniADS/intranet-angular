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
        Task<SugestaoResponse> SetLidaAsync(int id, bool lida);
        Task<BaseResponse<IEnumerable<SugestaoResponse>>> GetAllPagination(string? filter, int page = 1, int pageSize = 10);
        Task DeleteAsync(int id);
    }
}
