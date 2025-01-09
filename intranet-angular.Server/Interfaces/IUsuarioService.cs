using intranet_angular.Server.Entities;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<UsuarioResponse>> GetAllAsync();
        Task<UsuarioResponse?> GetByIdAsync(int id);
        Task<UsuarioResponse> CreateAsync(UsuarioRequest usuario);
        Task<UsuarioResponse> UpdateAsync(int id, UsuarioRequest usuario);
        Task DeleteAsync(int id);
        Task<string?> Authenticate(string login, string senha);

    }
}
