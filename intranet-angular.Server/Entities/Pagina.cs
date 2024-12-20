using System.ComponentModel.DataAnnotations;

namespace intranet_angular.Server.Entities
{
    public class Pagina
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        // Relacionamento com Slides
        public ICollection<Slide> Slides { get; set; }
    }
}
