using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class NoticiaService : INoticiaService
    {
        private readonly IntraNetDbContext _context;

        public NoticiaService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Noticia>> GetAllAsync()
        {
            return await _context.Noticias.ToListAsync();
        }

        public async Task<Noticia> GetByIdAsync(int id)
        {
            return await _context.Noticias.FindAsync(id);
        }

        public async Task<Noticia> AddAsync(Noticia noticia)
        {
            _context.Noticias.Add(noticia);
            await _context.SaveChangesAsync();
            return noticia;
        }

        public async Task<Noticia> UpdateAsync(Noticia noticia)
        {
            _context.Noticias.Update(noticia);
            await _context.SaveChangesAsync();
            return noticia;
        }

        public async Task DeleteAsync(int id)
        {
            var noticia = await _context.Noticias.FindAsync(id);
            if (noticia != null)
            {
                _context.Noticias.Remove(noticia);
                await _context.SaveChangesAsync();
            }
        }
    }

}
