namespace intranet_angular.Server.Entities
{
    public class MidiaNoticia
    {
        public int Id { get; set; }
        public int NoticiaId { get; set; }
        public Noticia Noticia { get; set; }

        public string Tipo { get; set; } // "imagem" ou "video"
        public string URL { get; set; }
        public string TipoMidia { get; set; } // "destaque" ou "galeria"
        public int Ordem { get; set; }
    }
}
