
using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Entities
{
    public class ConfiguracaoGrupoDeSlide
    {
        public int Id { get; set; }
        public int PaginaId { get; set; }
        public int Posicao { get; set; }
        public TipoMidiaEnum TipoDeMidia { get; set; }

        // Relacionamento com Página
        public Pagina Pagina { get; set; }
    }
}
