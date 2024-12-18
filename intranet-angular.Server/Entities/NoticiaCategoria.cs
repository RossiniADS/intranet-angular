namespace intranet_angular.Server.Entities
{
    public class NoticiaCategoria
    {
        public int NoticiaId { get; set; }
        public Noticia Noticia { get; set; }

        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
    }
}
