using intranet_angular.Server.Entities;
using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Request
{
    public class ConfiguracaoGrupoDeSlideRequest
    {
        public int? Id { get; set; }
        public int? PaginaId { get; set; }
        public int Posicao { get; set; }
        public TipoMidiaEnum TipoDeMidia { get; set; }
    }
}
