using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class PaginaService : IPaginaService
    {
        private readonly IntraNetDbContext _context;

        public PaginaService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pagina>> GetAllAsync()
        {
            return await _context.Paginas.ToListAsync();
        }

        public async Task<Pagina> GetByIdAsync(int id)
        {
            return await _context.Paginas.FindAsync(id);
        }

        public async Task AddAsync(Pagina pagina)
        {
            _context.Paginas.Add(pagina);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Pagina pagina)
        {
            _context.Paginas.Update(pagina);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var pagina = await _context.Paginas.FindAsync(id);
            if (pagina != null)
            {
                _context.Paginas.Remove(pagina);
                await _context.SaveChangesAsync();
            }
        }
    }
}
