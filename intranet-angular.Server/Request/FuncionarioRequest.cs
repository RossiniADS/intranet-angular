namespace intranet_angular.Server.Request
{
    public class FuncionarioRequest
    {
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }
        public string Cargo { get; set; }
        public string Departamento { get; set; }
        public IFormFile? File { get; set; }
    }
}
