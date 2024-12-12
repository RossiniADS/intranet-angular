using intranet_angular.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Context
{
    public class IntraNetDbContext : DbContext
    {
        public IntraNetDbContext(DbContextOptions options) : base(options)
        {
        }

        public virtual DbSet<Conteudo> Conteudos { get; set; }
        public virtual DbSet<LogAlteracao> LogAlteracaos { get; set; }
        public virtual DbSet<Pagina> Paginas { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
    }
}
