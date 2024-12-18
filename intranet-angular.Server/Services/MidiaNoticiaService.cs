using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class MidiaNoticiaService : IMidiaNoticiaService
    {
        private readonly IntraNetDbContext _context;

        public MidiaNoticiaService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MidiaNoticia>> GetAllAsync()
        {
            return await _context.MidiasNoticias.ToListAsync();
        }

        public async Task<MidiaNoticia> GetByIdAsync(int id)
        {
            return await _context.MidiasNoticias.FindAsync(id);
        }

        public async Task<MidiaNoticia> AddAsync(MidiaNoticia midiaNoticia)
        {
            _context.MidiasNoticias.Add(midiaNoticia);
            await _context.SaveChangesAsync();
            return midiaNoticia;
        }

        public async Task<MidiaNoticia> UpdateAsync(MidiaNoticia midiaNoticia)
        {
            _context.MidiasNoticias.Update(midiaNoticia);
            await _context.SaveChangesAsync();
            return midiaNoticia;
        }

        public async Task DeleteAsync(int id)
        {
            var midiaNoticia = await _context.MidiasNoticias.FindAsync(id);
            if (midiaNoticia != null)
            {
                _context.MidiasNoticias.Remove(midiaNoticia);
                await _context.SaveChangesAsync();
            }
        }
    }

}
