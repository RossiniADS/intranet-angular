using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Request
{
    public class PaginaRequest
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public ICollection<ConfiguracaoGrupoDeSlideRequest> ConfiguracoesDeGrupos { get; set; }

    }
}
