namespace intranet_angular.Server.Entities
{
    public class NewsItem
    {
        public Guid Id { get; set; }
        public Guid PageId { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }

        public Page Page { get; set; }
    }
}
