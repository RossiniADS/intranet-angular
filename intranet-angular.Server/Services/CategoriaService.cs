using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly IntraNetDbContext _context;

        public CategoriaService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoriaResponse>> GetAllAsync()
        {
            return await _context.Categorias
                .Select(c => new CategoriaResponse
                {
                    Id = c.Id,
                    Nome = c.Nome,
                })
                .ToListAsync();
        }

        public async Task<CategoriaResponse?> GetByIdAsync(int id)
        {
            return await _context.Categorias.Where(c => c.Id == id)
                .Select(c => new CategoriaResponse
                {
                    Id = c.Id,
                    Nome = c.Nome
                })
                .FirstOrDefaultAsync();
        }

        public async Task<CategoriaResponse> AddAsync(CategoriaRequest categoriaRequest)
        {
            var categoria = new Categoria()
            {
                Nome = categoriaRequest.Nome
            };

            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return new CategoriaResponse() { Id = categoria.Id, Nome = categoria.Nome };
        }

        public async Task<CategoriaResponse> UpdateAsync(int id, CategoriaRequest categoriaRequest)
        {
            var categoria = new Categoria()
            {
                Id = id,
                Nome = categoriaRequest.Nome
            };

            _context.Categorias.Update(categoria);
            await _context.SaveChangesAsync();
            return new CategoriaResponse() { Id = categoria.Id, Nome = categoria.Nome };
        }

        public async Task DeleteAsync(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria != null)
            {
                _context.Categorias.Remove(categoria);
                await _context.SaveChangesAsync();
            }
        }
    }

}
