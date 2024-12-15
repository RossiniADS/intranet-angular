using intranet_angular.Server.Entities;

namespace intranet_angular.Server.Model
{
    public class Page
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        // Relacionamento com Slides
        public ICollection<Slide> Slides { get; set; }
    }
}
