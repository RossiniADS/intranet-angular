
namespace intranet_angular.Server.Request
{
    public class GrupoDeSlideRequest
    {
        public string Nome { get; set; }
        public int PaginaId { get; set; }
        public int Posicao { get; set; }
        public ICollection<SlideRequest> Slides { get; set; }
    }
}
