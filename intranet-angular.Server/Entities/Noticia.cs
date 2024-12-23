namespace intranet_angular.Server.Entities
{
    public class Noticia
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Conteudo { get; set; }
        public bool IsTredingTop { get; set; }
        public DateTime DataPublicacao { get; set; } = DateTime.Now;

        // Relacionamento com Usuario
        public int? AutorId { get; set; }
        public Usuario Autor { get; set; }

        // Relacionamento com MidiasNoticias
        public ICollection<MidiaNoticia> Midias { get; set; }

        // Relacionamento com Categorias
        public ICollection<NoticiaCategoria> NoticiasCategorias { get; set; }
    }
}
