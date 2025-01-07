using System.ComponentModel.DataAnnotations;

namespace intranet_angular.Server.Entities
{
    public class Pagina
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public ICollection<ConfiguracaoGrupoDeSlide> ConfiguracoesDeGrupos { get; set; }

        public ICollection<GrupoDeSlides> GruposDeSlides { get; set; }
    }
}
