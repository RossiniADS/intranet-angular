using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface IFuncionarioService
    {
        Task<IEnumerable<FuncionarioResponse>> GetAllAsync();
        Task<FuncionarioResponse> GetByIdAsync(int id);
        Task<FuncionarioResponse> AddAsync(FuncionarioRequest funcionarioRequest);
        Task<FuncionarioResponse> UpdateAsync(int id, FuncionarioRequest funcionarioRequest);
        Task DeleteAsync(int id);
    }
}
