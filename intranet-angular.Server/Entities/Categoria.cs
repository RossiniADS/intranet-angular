namespace intranet_angular.Server.Entities
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        // Relacionamento com Noticias
        public ICollection<NoticiaCategoria> NoticiasCategorias { get; set; }
    }
}
