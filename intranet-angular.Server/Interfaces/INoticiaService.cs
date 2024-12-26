using intranet_angular.Server.Entities;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface INoticiaService
    {
        Task<IEnumerable<NoticiaResponse>> GetAllAsync();
        Task<BaseResponse<IEnumerable<NoticiaResponse>>> GetAllPagination(int page = 1, int pageSize = 10);
        Task<NoticiaResponse?> GetByIdAsync(int id);
        Task<NoticiaResponse> AddAsync(NoticiaRequest noticiaRequest);
        Task<NoticiaResponse> UpdateAsync(int id, NoticiaRequest noticiaRequest);
        Task DeleteAsync(int id);
    }
}
