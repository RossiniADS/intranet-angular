using intranet_angular.Server.Request;
using intranet_angular.Server.Response;

namespace intranet_angular.Server.Interfaces
{
    public interface IMenuItemService
    {
        Task<IEnumerable<MenuItemResponse>> GetAllAsync();
        Task<MenuItemResponse?> GetByIdAsync(int id);
        Task<MenuItemResponse> AddAsync(MenuItemRequest menuItem);
        Task<MenuItemResponse> UpdateAsync(int id, MenuItemRequest menuItem);
        Task DeleteAsync(int id);
    }
}