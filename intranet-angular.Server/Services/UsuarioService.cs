using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace intranet_angular.Server.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IntraNetDbContext _context;
        private readonly IConfiguration _configuration;

        public UsuarioService(IntraNetDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            return await _context.Set<Usuario>().ToListAsync();
        }

        public async Task<Usuario> GetByIdAsync(int id)
        {
            return await _context.Set<Usuario>().FindAsync(id);
        }

        public async Task<Usuario> CreateAsync(Usuario usuario)
        {
            usuario.CriadoEm = DateTime.UtcNow;
            usuario.UltimaAtualizacao = DateTime.UtcNow;
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
            await _context.Set<Usuario>().AddAsync(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario> UpdateAsync(Usuario usuario)
        {
            var existingUser = await _context.Set<Usuario>().FindAsync(usuario.Id);
            if (existingUser == null) throw new KeyNotFoundException("Usuário não encontrado.");

            existingUser.Nome = usuario.Nome;
            existingUser.Email = usuario.Email;
            existingUser.Login = usuario.Login;
            if (!string.IsNullOrEmpty(usuario.Senha))
            {
                existingUser.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
            }
            existingUser.Aniversario = usuario.Aniversario;
            existingUser.UltimaAtualizacao = DateTime.UtcNow;

            _context.Set<Usuario>().Update(existingUser);
            await _context.SaveChangesAsync();
            return existingUser;
        }

        public async Task DeleteAsync(int id)
        {
            var usuario = await _context.Set<Usuario>().FindAsync(id);
            if (usuario == null) throw new KeyNotFoundException("Usuário não encontrado.");

            _context.Set<Usuario>().Remove(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<string> AuthenticateAsync(string login, string senha)
        {
            var usuario = await _context.Set<Usuario>().FirstOrDefaultAsync(u => u.Login == login);
            if (usuario == null || !BCrypt.Net.BCrypt.Verify(senha, usuario.Senha))
            {
                throw new UnauthorizedAccessException("Login ou senha inválidos.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.Name, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email)
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
