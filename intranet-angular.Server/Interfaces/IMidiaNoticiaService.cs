using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IMidiaNoticiaService
    {
        Task<IEnumerable<MidiaNoticia>> GetAllAsync();
        Task<MidiaNoticia> GetByIdAsync(int id);
        Task<MidiaNoticia> AddAsync(MidiaNoticia midiaNoticia);
        Task<MidiaNoticia> UpdateAsync(MidiaNoticia midiaNoticia);
        Task DeleteAsync(int id);
    }
}
