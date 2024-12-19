using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Entities
{
    public class MidiaNoticia
    {
        public int Id { get; set; }
        public int NoticiaId { get; set; }
        public Noticia Noticia { get; set; }

        public TipoMidiaEnum Tipo { get; set; } // "imagem" ou "video"
        public string URL { get; set; }
        public int Ordem { get; set; }
    }
}
