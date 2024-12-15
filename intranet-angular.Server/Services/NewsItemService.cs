using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace intranet_angular.Server.Services
{
    public class NewsItemService : INewsItemService
    {
        private readonly IntraNetDbContext _context;

        public NewsItemService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<NewsItem>> GetAllAsync()
        {
            return await _context.NewsItems.ToListAsync();
        }

        public async Task<NewsItem> GetByIdAsync(Guid id)
        {
            return await _context.NewsItems.FindAsync(id);
        }

        public async Task AddAsync(NewsItem newsItem)
        {
            await _context.NewsItems.AddAsync(newsItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(NewsItem newsItem)
        {
            _context.NewsItems.Update(newsItem);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var newsItem = await GetByIdAsync(id);
            if (newsItem != null)
            {
                _context.NewsItems.Remove(newsItem);
                await _context.SaveChangesAsync();
            }
        }
    }

}
