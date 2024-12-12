using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IPaginaService
    {
        Task<IEnumerable<Pagina>> GetAllAsync();
        Task<Pagina> GetByIdAsync(int id);
        Task<Pagina> AddAsync(Pagina pagina);
        Task<Pagina> UpdateAsync(Pagina pagina);
        Task<bool> DeleteAsync(int id);
    }
}
