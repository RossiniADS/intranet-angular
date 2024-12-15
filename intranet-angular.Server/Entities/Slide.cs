namespace intranet_angular.Server.Entities
{
    public class Slide
    {
        public Guid Id { get; set; }
        public Guid PageId { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Src { get; set; }
        public int Order { get; set; }

        public Page Page { get; set; }
    }
}
