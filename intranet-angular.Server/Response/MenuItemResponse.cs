namespace intranet_angular.Server.Response
{
    public class MenuItemResponse
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public string? PdfUrl { get; set; }
        public int? ParentId { get; set; }
    }
}