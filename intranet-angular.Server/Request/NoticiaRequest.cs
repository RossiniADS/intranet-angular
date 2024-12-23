namespace intranet_angular.Server.Request
{
    public class NoticiaRequest
    {
        public string Titulo { get; set; }
        public string Conteudo { get; set; }
        public bool IsTredingTop { get; set; }
        public DateTime DataPublicacao { get; set; }
        public int? AutorId { get; set; }
        public List<int> CategoriaIds { get; set; }
        public List<IFormFile> Midias { get; set; }
    }
}
