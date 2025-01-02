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

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Noticia> Noticias { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<NoticiaCategoria> NoticiasCategorias { get; set; }
        public DbSet<MidiaNoticia> MidiasNoticias { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Pagina> Paginas { get; set; }
        public DbSet<Slide> Slides { get; set; }
        public DbSet<GrupoDeSlides> GrupoDeSlides { get; set; }
        public DbSet<Cardapio> Cardapios { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração do relacionamento Many-to-Many
            modelBuilder.Entity<NoticiaCategoria>()
                .HasKey(nc => new { nc.NoticiaId, nc.CategoriaId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
