using System.ComponentModel.DataAnnotations;

namespace intranet_angular.Server.Entities
{
    public class Pagina
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Titulo { get; set; }
        [Required]
        public string UrlAmigavel { get; set; }
        public DateTime CriadoEm { get; set; }
        public DateTime UltimaAtualizacao { get; set; }

        public virtual ICollection<Conteudo> Conteudos { get; set; }

    }
}
