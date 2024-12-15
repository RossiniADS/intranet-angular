namespace intranet_angular.Server.Entities
{
    public class TrendingItem
    {
        public Guid Id { get; set; }
        public Guid PageId { get; set; }
        public string ImageUrl { get; set; }
        public string AltText { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }

        public Page Page { get; set; }
    }
}
