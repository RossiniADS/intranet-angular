using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Request
{
    public class SlideRequest
    {
        public int? Id { get; set; }
        public int? GrupoDeSlidesId { get; set; }
        public TipoMidiaEnum Tipo { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public IFormFile? File { get; set; }
        public int Ordem { get; set; }
        public int? NoticiaId { get; set; }

    }
}
