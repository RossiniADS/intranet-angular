using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class ConteudoService : IConteudoService
    {
        private readonly IntraNetDbContext _context;

        public ConteudoService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Conteudo>> ObterTodosAsync()
        {
            return await _context.Conteudos
                .Include(c => c.Pagina)
                .Include(c => c.LogAlteracoes)
                .ToListAsync();
        }

        public async Task<Conteudo> ObterPorIdAsync(int id)
        {
            return await _context.Conteudos
                .Include(c => c.Pagina)
                .Include(c => c.LogAlteracoes)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task AdicionarAsync(Conteudo conteudo)
        {
            conteudo.CriadoEm = DateTime.UtcNow;
            conteudo.UltimaAtualizacao = DateTime.UtcNow;
            _context.Conteudos.Add(conteudo);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarAsync(Conteudo conteudo)
        {
            var conteudoExistente = await _context.Conteudos.FindAsync(conteudo.Id);
            if (conteudoExistente == null)
                throw new KeyNotFoundException("Conteúdo não encontrado.");

            conteudoExistente.TipoConteudo = conteudo.TipoConteudo;
            conteudoExistente.Ordem = conteudo.Ordem;
            conteudoExistente.Corpo = conteudo.Corpo;
            conteudoExistente.PaginaId = conteudo.PaginaId;
            conteudoExistente.UltimaAtualizacao = DateTime.UtcNow;

            _context.Conteudos.Update(conteudoExistente);
            await _context.SaveChangesAsync();
        }

        public async Task RemoverAsync(int id)
        {
            var conteudo = await _context.Conteudos.FindAsync(id);
            if (conteudo == null)
                throw new KeyNotFoundException("Conteúdo não encontrado.");

            _context.Conteudos.Remove(conteudo);
            await _context.SaveChangesAsync();
        }
    }
}
