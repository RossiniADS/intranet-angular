using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
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

        public async Task<IEnumerable<PaginaResponse>> GetAllAsync()
        {
            return await _context.Paginas
                .Select(p => new PaginaResponse
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Descricao = p.Descricao
                })
                .ToListAsync();
        }

        public async Task<PaginaResponse?> GetByIdAsync(int id)
        {
            return await _context.Paginas.Where(p => p.Id == id)
                .Select(p => new PaginaResponse
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Descricao = p.Descricao
                })
                .FirstOrDefaultAsync();
        }

        public async Task<PaginaResponse> AddAsync(PaginaRequest paginaRequest)
        {
            var pagina = new Pagina()
            {
                Nome = paginaRequest.Nome,
                Descricao = paginaRequest.Descricao
            };

            _context.Paginas.Add(pagina);
            await _context.SaveChangesAsync();

            return new PaginaResponse() { Id = pagina.Id, Nome = pagina.Nome };
        }

        public async Task<PaginaResponse> UpdateAsync(int id, PaginaRequest paginaRequest)
        {
            var pagina = new Pagina()
            {
                Id = id,
                Nome = paginaRequest.Nome,
                Descricao = paginaRequest.Descricao
            };

            _context.Paginas.Update(pagina);
            await _context.SaveChangesAsync();
            return new PaginaResponse() { Id = pagina.Id, Nome = pagina.Nome };
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
