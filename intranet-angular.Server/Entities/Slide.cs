namespace intranet_angular.Server.Entities
{
    public class Slide
    {
        public int Id { get; set; }
        public int PaginaId { get; set; }
        public string Tipo { get; set; } // "imagem" ou "video"
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string URL { get; set; }
        public int Ordem { get; set; }

        public Pagina Pagina { get; set; }
    }
}
