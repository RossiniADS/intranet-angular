using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Request
{
    public class SugestaoRequest
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
        public string Assunto { get; set; }
        public string Mensagem { get; set; }
    }
}
