namespace intranet_angular.Server.Entities
{
    public class GrupoDeSlides
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Posicao { get; set; }
        public int PaginaId { get; set; }
        public int AutorId { get; set; }
        public DateTime DataPublicacao { get; set; } = DateTime.Now;

        public Pagina Pagina { get; set; }
        public ICollection<Slide> Slides { get; set; }
        public Usuario Autor { get; set; }
    }
}
