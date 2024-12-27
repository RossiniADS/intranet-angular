namespace intranet_angular.Server.Entities
{
    public class Funcionario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }
        public string Cargo { get; set; }
        public string Departamento { get; set; }
        public string ImagemUrl { get; set; }
    }
}
