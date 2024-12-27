namespace intranet_angular.Server.Request
{
    public class EventoRequest
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public string Localizacao { get; set; }
        public IFormFile File { get; set; }
    }
}
