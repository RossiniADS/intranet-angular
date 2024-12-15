using intranet_angular.Server.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Drawing;

namespace intranet_angular.Server.Context
{
    public class IntraNetDbContext : DbContext
    {
        public IntraNetDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Page> Pages { get; set; }
        public DbSet<Slide> Slides { get; set; }
        public DbSet<TrendingItem> TrendingItems { get; set; }
        public DbSet<Tab> Tabs { get; set; }
        public DbSet<NewsItem> NewsItems { get; set; }
        public DbSet<Video> Videos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Page>().HasMany(p => p.Slides).WithOne(s => s.Page).HasForeignKey(s => s.PageId);
            modelBuilder.Entity<Page>().HasMany(p => p.TrendingItems).WithOne(t => t.Page).HasForeignKey(t => t.PageId);
            modelBuilder.Entity<Page>().HasMany(p => p.Tabs).WithOne(t => t.Page).HasForeignKey(t => t.PageId);
            modelBuilder.Entity<Page>().HasMany(p => p.NewsItems).WithOne(n => n.Page).HasForeignKey(n => n.PageId);
            modelBuilder.Entity<Page>().HasMany(p => p.Videos).WithOne(v => v.Page).HasForeignKey(v => v.PageId);
        }
    }
}
