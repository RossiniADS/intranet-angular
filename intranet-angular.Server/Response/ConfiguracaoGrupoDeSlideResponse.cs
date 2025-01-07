using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Response
{
    public class ConfiguracaoGrupoDeSlideResponse
    {
        public int Id { get; set; }
        public int PaginaId { get; set; }
        public int Posicao { get; set; }
        public TipoMidiaEnum TipoDeMidia { get; set; }
    }
}
