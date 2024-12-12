using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace intranet_angular.Server.Entities
{
    public class LogAlteracao
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Conteudo")]
        public int ConteudoId { get; set; }
        [ForeignKey("Usuario")]
        public int UsuarioId { get; set; }
        [Required]
        public string ConteudoAnterior { get; set; }
        public DateTime AlteradoEm { get; set; }

        public virtual Conteudo Conteudo { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
