using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IEventoService
    {
        Task<IEnumerable<Evento>> GetAllAsync();
        Task<Evento> GetByIdAsync(int id);
        Task AddAsync(Evento evento);
        Task UpdateAsync(Evento evento);
        Task DeleteAsync(int id);
    }
}
