using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface INoticiaService
    {
        Task<IEnumerable<Noticia>> GetAllAsync();
        Task<Noticia> GetByIdAsync(int id);
        Task<Noticia> AddAsync(Noticia noticia);
        Task<Noticia> UpdateAsync(Noticia noticia);
        Task DeleteAsync(int id);
    }
}
