using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class SlideService : ISlideService
    {
        private readonly IntraNetDbContext _context;

        public SlideService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Slide>> GetAllAsync()
        {
            return await _context.Slides.ToListAsync();
        }

        public async Task<Slide> GetByIdAsync(int id)
        {
            return await _context.Slides.FindAsync(id);
        }

        public async Task AddAsync(Slide slide)
        {
            _context.Slides.Add(slide);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Slide slide)
        {
            _context.Slides.Update(slide);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var slide = await _context.Slides.FindAsync(id);
            if (slide != null)
            {
                _context.Slides.Remove(slide);
                await _context.SaveChangesAsync();
            }
        }
    }
}
