using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace intranet_angular.Server.Services
{
    public class TrendingItemService : ITrendingItemService
    {
        private readonly IntraNetDbContext _context;

        public TrendingItemService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TrendingItem>> GetAllAsync()
        {
            return await _context.TrendingItems.ToListAsync();
        }

        public async Task<TrendingItem> GetByIdAsync(Guid id)
        {
            return await _context.TrendingItems.FindAsync(id);
        }

        public async Task AddAsync(TrendingItem trendingItem)
        {
            await _context.TrendingItems.AddAsync(trendingItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TrendingItem trendingItem)
        {
            _context.TrendingItems.Update(trendingItem);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var trendingItem = await GetByIdAsync(id);
            if (trendingItem != null)
            {
                _context.TrendingItems.Remove(trendingItem);
                await _context.SaveChangesAsync();
            }
        }
    }
}
