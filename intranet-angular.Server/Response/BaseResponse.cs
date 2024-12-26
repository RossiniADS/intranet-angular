namespace intranet_angular.Server.Response
{
    public class BaseResponse<T>
    {
        public T? Data { get; set; }
        public int? TotalRecords { get; set; }
    }
}
