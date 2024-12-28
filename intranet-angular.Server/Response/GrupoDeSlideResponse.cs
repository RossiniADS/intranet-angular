using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Response
{
    public class GrupoDeSlideResponse
    {
        public int Id { get; set; }
        public int PaginaId { get; set; }
        public string Nome { get; set; }
        public int Posicao { get; set; }
        // Relacionamento com Slides
        public ICollection<SlideResponse> Slides { get; set; }
    }
}
