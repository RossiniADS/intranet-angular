using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class PageService : IPageService
    {
        private readonly IntraNetDbContext _context;

        public PageService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Page>> GetAllAsync()
        {
            return await _context.Pages.Include(p => p.Slides).ToListAsync();
        }

        public async Task<Page> GetByIdAsync(Guid id)
        {
            return await _context.Pages.Include(p => p.Slides)
                                       .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Page> CreateAsync(Page page)
        {
            _context.Pages.Add(page);
            await _context.SaveChangesAsync();
            return page;
        }

        public async Task<Page> UpdateAsync(Page page)
        {
            _context.Pages.Update(page);
            await _context.SaveChangesAsync();
            return page;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var page = await _context.Pages.FindAsync(id);
            if (page == null) return false;

            _context.Pages.Remove(page);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
