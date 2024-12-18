using System.ComponentModel.DataAnnotations;

namespace intranet_angular.Server.Model
{
    public class UsuarioModel
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public DateTime Aniversario { get; set; }
    }
}
