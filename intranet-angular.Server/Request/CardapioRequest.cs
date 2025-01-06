using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Request
{
    public class CardapioRequest
    {
        public DiaDaSemana DiaDaSemana { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public IFormFile? File { get; set; }
    }
}
