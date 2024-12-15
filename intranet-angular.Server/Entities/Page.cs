using System.ComponentModel.DataAnnotations;

namespace intranet_angular.Server.Entities
{
    public class Page
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<Slide> Slides { get; set; }
        public ICollection<TrendingItem> TrendingItems { get; set; }
        public ICollection<Tab> Tabs { get; set; }
        public ICollection<NewsItem> NewsItems { get; set; }
        public ICollection<Video> Videos { get; set; }
    }
}
