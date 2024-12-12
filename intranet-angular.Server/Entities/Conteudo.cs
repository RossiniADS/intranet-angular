using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace intranet_angular.Server.Entities
{
    public class Conteudo
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Pagina")]
        public int PaginaId { get; set; }
        [Required]
        public string TipoConteudo { get; set; }
        [Required]
        public int Ordem { get; set; }
        [Required]
        public string Corpo { get; set; }

        public DateTime CriadoEm { get; set; }
        public DateTime UltimaAtualizacao { get; set; }

        public virtual Pagina Pagina { get; set; }
        public virtual ICollection<LogAlteracao> LogAlteracoes { get; set; }

    }
}
