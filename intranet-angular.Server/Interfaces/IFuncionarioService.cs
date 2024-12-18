using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IFuncionarioService
    {
        Task<IEnumerable<Funcionario>> GetAllAsync();
        Task<Funcionario> GetByIdAsync(int id);
        Task AddAsync(Funcionario funcionario);
        Task UpdateAsync(Funcionario funcionario);
        Task DeleteAsync(int id);
    }
}
