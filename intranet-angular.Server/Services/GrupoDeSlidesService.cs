using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class GrupoDeSlidesService : IGrupoDeSlidesService
    {
        private readonly IntraNetDbContext _context;

        public GrupoDeSlidesService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GrupoDeSlides>> GetAllAsync()
        {
            return await _context.GrupoDeSlides.ToListAsync();
        }

        public async Task<GrupoDeSlides> GetByIdAsync(int id)
        {
            return await _context.GrupoDeSlides.FindAsync(id);
        }

        public async Task AddAsync(GrupoDeSlides grupoDeSlides)
        {
            _context.GrupoDeSlides.Add(grupoDeSlides);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(GrupoDeSlides grupoDeSlides)
        {
            _context.GrupoDeSlides.Update(grupoDeSlides);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var grupoDeSlides = await _context.GrupoDeSlides.FindAsync(id);
            if (grupoDeSlides != null)
            {
                _context.GrupoDeSlides.Remove(grupoDeSlides);
                await _context.SaveChangesAsync();
            }
        }
    }
}
