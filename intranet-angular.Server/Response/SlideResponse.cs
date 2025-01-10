using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Response
{
    public class SlideResponse
    {
        public int Id { get; set; }
        public int GrupoDeSlidesId { get; set; }
        public int? NoticiaId { get; set; }
        public TipoMidiaEnum Tipo { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string URL { get; set; }
        public int Ordem { get; set; }

        public List<string> CategoriaNomes { get; set; }
    }
}
