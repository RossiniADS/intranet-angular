using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Response
{
    public class SugestaoResponse
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
        public string Assunto { get; set; }
        public string Mensagem { get; set; }
        public bool Lida { get; set; }
        public DateTime CriadaEm { get; set; }
        public DateTime? LidaEm { get; set; }
    }
}
