using intranet_angular.Server.Request;

namespace intranet_angular.Server.Response
{
    public class PaginaResponse
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public ICollection<ConfiguracaoGrupoDeSlideResponse> ConfiguracoesDeGrupos { get; set; }

    }
}
