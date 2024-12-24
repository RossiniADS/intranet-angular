namespace intranet_angular.Server.Response
{
    public class NoticiaResponse
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string Conteudo { get; set; }
        public bool IsTrendingTop { get; set; }
        public DateTime DataPublicacao { get; set; }
        public int? AutorId { get; set; }
        public List<CategoriaResponse> Categoria { get; set; }
        public List<string> MidiaUrl { get; set; }
    }
}
