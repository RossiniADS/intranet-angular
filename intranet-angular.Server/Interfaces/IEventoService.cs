using intranet_angular.Server.Entities;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface IEventoService
    {
        Task<IEnumerable<EventoResponse>> GetAllAsync();
        Task<EventoResponse?> GetByIdAsync(int id);
        Task<EventoResponse> AddAsync(EventoRequest eventoRequest);
        Task<EventoResponse> UpdateAsync(int id, EventoRequest eventoRequest);
        Task DeleteAsync(int id);
    }
}
