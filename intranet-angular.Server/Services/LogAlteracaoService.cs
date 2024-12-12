using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class LogAlteracaoService : ILogAlteracaoService
    {
        private readonly IntraNetDbContext _context;

        public LogAlteracaoService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LogAlteracao>> GetAllAsync()
        {
            return await _context.LogAlteracaos.Include(l => l.Conteudo).Include(l => l.Usuario).ToListAsync();
        }

        public async Task<LogAlteracao> GetByIdAsync(int id)
        {
            return await _context.LogAlteracaos.Include(l => l.Conteudo).Include(l => l.Usuario)
                .FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task AddAsync(LogAlteracao logAlteracao)
        {
            logAlteracao.AlteradoEm = DateTime.UtcNow;
            _context.LogAlteracaos.Add(logAlteracao);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(LogAlteracao logAlteracao)
        {
            _context.LogAlteracaos.Update(logAlteracao);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var logAlteracao = await _context.LogAlteracaos.FindAsync(id);
            if (logAlteracao != null)
            {
                _context.LogAlteracaos.Remove(logAlteracao);
                await _context.SaveChangesAsync();
            }
        }
    }
}
