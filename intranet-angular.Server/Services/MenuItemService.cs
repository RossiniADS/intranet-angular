using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class MenuItemService : IMenuItemService
    {
        private readonly IntraNetDbContext _context;

        public MenuItemService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MenuItemResponse>> GetAllAsync()
        {
            var menuItem = await _context.MenuItems.ToListAsync();
            return menuItem.Select(MapToResponse);
        }

        public async Task<MenuItemResponse?> GetByIdAsync(int id)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);
            return menuItem == null ? null : MapToResponse(menuItem);
        }

        public async Task<MenuItemResponse> AddAsync(MenuItemRequest menuItemRequest)
        {
            var menuItem = new MenuItem
            {
                Label = menuItemRequest.Label,
                PdfUrl = await ProcessarMidiasAsync(menuItemRequest.File),
                ParentId = menuItemRequest.ParentId
            };

            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();

            return MapToResponse(menuItem);
        }

        public async Task<MenuItemResponse> UpdateAsync(int id, MenuItemRequest menuItemRequest)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);

            if (menuItem == null)
            {
                throw new KeyNotFoundException("Menu item não encontrado");
            }

            menuItem.Label = menuItemRequest.Label;
            menuItem.ParentId = menuItemRequest.ParentId;

            if (!string.IsNullOrEmpty(menuItem.PdfUrl) && menuItemRequest.File != null)
            {
                if (File.Exists(menuItem.PdfUrl))
                {
                    File.Delete(menuItem.PdfUrl);
                }
            }

            if (menuItemRequest.File != null)
            {
                menuItem.PdfUrl = await ProcessarMidiasAsync(menuItemRequest.File);
            }

            _context.MenuItems.Update(menuItem);
            await _context.SaveChangesAsync();

            return MapToResponse(menuItem);
        }

        public async Task DeleteAsync(int id)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);

            if (menuItem != null)
            {
                _context.MenuItems.Remove(menuItem);
                await _context.SaveChangesAsync();
            }
        }

        private static async Task<string?> ProcessarMidiasAsync(IFormFile midia)
        {
            if (midia == null) return null;

            var filePath = Path.Combine("Uploads", Guid.NewGuid() + Path.GetExtension(midia.FileName));
            var directoryPath = Path.GetDirectoryName(filePath);

            if (directoryPath != null && !Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await midia.CopyToAsync(stream);
            }

            return filePath;
        }

        private static MenuItemResponse MapToResponse(MenuItem menuItem) => new MenuItemResponse
        {
            Id = menuItem.Id,
            Label = menuItem.Label,
            ParentId = menuItem.ParentId,
            PdfUrl = menuItem.PdfUrl
        };
    }
}