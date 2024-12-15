namespace intranet_angular.Server.Entities
{
    public class Tab
    {
        public Guid Id { get; set; }
        public Guid PageId { get; set; }
        public string Label { get; set; }
        public string Href { get; set; }
        public bool Active { get; set; }

        public Page Page { get; set; }
    }
}
