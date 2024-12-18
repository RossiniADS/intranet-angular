using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IntraNetDbContext _context;

        public UsuarioService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuario> GetByIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<Usuario> CreateAsync(Usuario usuario)
        {
            usuario.CriadoEm = DateTime.UtcNow;
            usuario.UltimaAtualizacao = DateTime.UtcNow;

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return usuario;
        }

        public async Task<Usuario> UpdateAsync(int id, Usuario usuario)
        {
            var existingUsuario = await _context.Usuarios.FindAsync(id);

            if (existingUsuario == null)
            {
                throw new KeyNotFoundException("Usuário não encontrado.");
            }

            existingUsuario.Nome = usuario.Nome;
            existingUsuario.Email = usuario.Email;
            existingUsuario.Login = usuario.Login;
            existingUsuario.Senha = usuario.Senha;
            existingUsuario.Aniversario = usuario.Aniversario;
            existingUsuario.UltimaAtualizacao = DateTime.UtcNow;

            _context.Usuarios.Update(existingUsuario);
            await _context.SaveChangesAsync();

            return existingUsuario;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return false;
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return true;
        }
    }

}
