namespace intranet_angular.Server.Request
{
    public class NoticiaRequest
    {
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string Conteudo { get; set; }
        public bool IsTrendingTop { get; set; }
        public DateTime DataPublicacao { get; set; }
        public int? AutorId { get; set; }
        public List<int> CategoriaIds { get; set; }
        public IFormFile? MidiaPrincipal { get; set; }
        public IFormFile? MidiaSecundaria { get; set; }
        public IFormFile? MidiaTerciaria { get; set; }
    }
}
