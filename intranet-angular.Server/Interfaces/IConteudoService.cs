using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Interfaces
{
    public interface IConteudoService
    {
        Task<IEnumerable<Conteudo>> ObterTodosAsync();
        Task<Conteudo> ObterPorIdAsync(int id);
        Task AdicionarAsync(Conteudo conteudo);
        Task AtualizarAsync(Conteudo conteudo);
        Task RemoverAsync(int id);
    }
}
