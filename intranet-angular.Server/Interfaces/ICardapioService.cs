using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface ICardapioService
    {
        Task<IEnumerable<CardapioResponse>> GetAllAsync();
        Task<CardapioResponse?> GetByIdAsync(int id);
        Task<CardapioResponse> AddAsync(CardapioRequest cardapio);
        Task<CardapioResponse> UpdateAsync(int id, CardapioRequest cardapio);
        Task DeleteAsync(int id);
    }
}
