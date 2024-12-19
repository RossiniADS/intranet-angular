using intranet_angular.Server.Entities;
using intranet_angular.Server.Model;

namespace intranet_angular.Server.Interfaces
{
    public interface INoticiaService
    {
        Task<IEnumerable<Noticia>> GetAllAsync();
        Task<Noticia> GetByIdAsync(int id);
        Task<Noticia> AddAsync(NoticiaModel noticiaModel);
        Task<Noticia> UpdateAsync(int id, NoticiaModel noticiaModel);
        Task DeleteAsync(int id);
    }
}
