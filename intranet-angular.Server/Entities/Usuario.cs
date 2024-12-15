using System.ComponentModel.DataAnnotations;

namespace intranet_angular.Server.Entities
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Senha { get; set; }
        [Required]
        public DateTime Aniversario { get; set; }
        public DateTime CriadoEm { get; set; }
        public DateTime UltimaAtualizacao { get; set; }
    }
}
