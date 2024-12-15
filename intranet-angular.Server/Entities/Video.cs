namespace intranet_angular.Server.Entities
{
    public class Video
    {
        public Guid Id { get; set; }
        public Guid PageId { get; set; }
        public string Src { get; set; }
        public string Title { get; set; }

        public Page Page { get; set; }
    }
}
