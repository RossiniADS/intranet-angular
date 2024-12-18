using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<Usuario>> GetAllAsync();
        Task<Usuario> GetByIdAsync(int id);
        Task<Usuario> CreateAsync(Usuario usuario);
        Task<Usuario> UpdateAsync(int id, Usuario usuario);
        Task<bool> DeleteAsync(int id);
    }
}
