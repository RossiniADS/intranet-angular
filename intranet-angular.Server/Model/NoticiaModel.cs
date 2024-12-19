namespace intranet_angular.Server.Model
{
    public class NoticiaModel
    {
        public string Titulo { get; set; }
        public string Conteudo { get; set; }
        public DateTime DataPublicacao { get; set; }
        public int? AutorId { get; set; }
        public List<int> CategoriaIds { get; set; }
        public List<IFormFile> Midias { get; set; }
    }
}
