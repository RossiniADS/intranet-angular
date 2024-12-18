using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IPaginaService
    {
        Task<IEnumerable<Pagina>> GetAllAsync();
        Task<Pagina> GetByIdAsync(int id);
        Task AddAsync(Pagina pagina);
        Task UpdateAsync(Pagina pagina);
        Task DeleteAsync(int id);
    }
}
