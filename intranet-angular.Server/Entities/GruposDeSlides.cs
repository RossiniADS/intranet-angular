namespace intranet_angular.Server.Entities
{
    public class GrupoDeSlides
    {
        public int Id { get; set; }
        public int PaginaId { get; set; }
        public string Nome { get; set; }

        // Relacionamento com Página
        public Pagina Pagina { get; set; }

        // Relacionamento com Slides
        public ICollection<Slide> Slides { get; set; }
    }
}
