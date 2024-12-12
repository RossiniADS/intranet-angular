using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface ILogAlteracaoService
    {
        Task<IEnumerable<LogAlteracao>> GetAllAsync();
        Task<LogAlteracao> GetByIdAsync(int id);
        Task AddAsync(LogAlteracao logAlteracao);
        Task UpdateAsync(LogAlteracao logAlteracao);
        Task DeleteAsync(int id);
    }
}
