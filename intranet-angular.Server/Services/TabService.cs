using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace intranet_angular.Server.Services
{
    public class TabService : ITabService
    {
        private readonly IntraNetDbContext _context;

        public TabService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tab>> GetAllAsync()
        {
            return await _context.Tabs.ToListAsync();
        }

        public async Task<Tab> GetByIdAsync(Guid id)
        {
            return await _context.Tabs.FindAsync(id);
        }

        public async Task AddAsync(Tab tab)
        {
            await _context.Tabs.AddAsync(tab);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Tab tab)
        {
            _context.Tabs.Update(tab);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var tab = await GetByIdAsync(id);
            if (tab != null)
            {
                _context.Tabs.Remove(tab);
                await _context.SaveChangesAsync();
            }
        }
    }

}
