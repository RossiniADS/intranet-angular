namespace intranet_angular.Server.Model
{
    public class Slide
    {
        public Guid Id { get; set; }
        public string Type { get; set; } // "image" ou "video"
        public string Src { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        // Relacionamento com Página
        public Guid PageId { get; set; }
        public Page Page { get; set; }
    }
}
