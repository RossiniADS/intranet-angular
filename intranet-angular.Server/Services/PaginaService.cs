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
            return await _context.Set<Pagina>().Include(p => p.Conteudos).ToListAsync();
        }

        public async Task<Pagina> GetByIdAsync(int id)
        {
            return await _context.Set<Pagina>()
                .Include(p => p.Conteudos)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Pagina> AddAsync(Pagina pagina)
        {
            pagina.CriadoEm = DateTime.UtcNow;
            pagina.UltimaAtualizacao = DateTime.UtcNow;

            _context.Set<Pagina>().Add(pagina);
            await _context.SaveChangesAsync();

            return pagina;
        }

        public async Task<Pagina> UpdateAsync(Pagina pagina)
        {
            var existingPagina = await _context.Set<Pagina>().FindAsync(pagina.Id);
            if (existingPagina == null) throw new KeyNotFoundException("Página não encontrada.");

            existingPagina.Titulo = pagina.Titulo;
            existingPagina.UrlAmigavel = pagina.UrlAmigavel;
            existingPagina.UltimaAtualizacao = DateTime.UtcNow;

            _context.Set<Pagina>().Update(existingPagina);
            await _context.SaveChangesAsync();

            return existingPagina;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var pagina = await _context.Set<Pagina>().FindAsync(id);
            if (pagina == null) return false;

            _context.Set<Pagina>().Remove(pagina);
            await _context.SaveChangesAsync();

            return true;
        }
    }

}
