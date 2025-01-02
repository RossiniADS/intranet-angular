namespace intranet_angular.Server.Request
{
    public class MenuItemRequest
    {
        public string Label { get; set; }
        public IFormFile? File { get; set; }
        public int? ParentId { get; set; }
    }
}