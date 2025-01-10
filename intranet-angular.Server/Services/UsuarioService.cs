using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace intranet_angular.Server.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IntraNetDbContext _context;
        private readonly string _key;

        public UsuarioService(IntraNetDbContext context, string key)
        {
            _context = context;
            _key = key;
        }

        public async Task<IEnumerable<UsuarioResponse>> GetAllAsync()
        {
            var usuarios = await _context.Usuarios.ToListAsync();
            return usuarios.Select(MapToResponse);
        }

        public async Task<UsuarioResponse?> GetByIdAsync(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            return usuario == null ? null : MapToResponse(usuario);
        }

        public async Task<UsuarioResponse> CreateAsync(UsuarioRequest usuarioRequest)
        {
            var usuario = new Usuario
            {
                Nome = usuarioRequest.Nome,
                Aniversario = usuarioRequest.Aniversario,
                CriadoEm = DateTime.UtcNow,
                UltimaAtualizacao = DateTime.UtcNow,
                Email = usuarioRequest.Email,
                Login = usuarioRequest.Login,
                Senha = HashPassword(usuarioRequest.Senha),
                ImagemUrl = await ProcessarMidiasAsync(usuarioRequest.File),
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return MapToResponse(usuario);
        }

        public async Task<UsuarioResponse> UpdateAsync(int id, UsuarioRequest usuarioRequest)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                throw new KeyNotFoundException("Usuário não encontrado.");
            }

            usuario.Nome = usuarioRequest.Nome;
            usuario.Email = usuarioRequest.Email;
            usuario.Login = usuarioRequest.Login;

            // Atualizar a senha somente se ela foi alterada
            if (!string.IsNullOrWhiteSpace(usuarioRequest.Senha))
            {
                usuario.Senha = HashPassword(usuarioRequest.Senha);
            }
            usuario.Aniversario = usuarioRequest.Aniversario;
            usuario.UltimaAtualizacao = DateTime.UtcNow;

            if (!string.IsNullOrEmpty(usuario.ImagemUrl) && usuarioRequest.File != null)
            {
                if (File.Exists(usuario.ImagemUrl))
                {
                    File.Delete(usuario.ImagemUrl);
                }
            }

            if (usuarioRequest.File != null)
            {
                usuario.ImagemUrl = await ProcessarMidiasAsync(usuarioRequest.File);
            }

            _context.Usuarios.Update(usuario);
            await _context.SaveChangesAsync();

            return MapToResponse(usuario);
        }

        public async Task DeleteAsync(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return;

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
        }

        private static UsuarioResponse MapToResponse(Usuario usuario) => new UsuarioResponse
        {
            Id = usuario.Id,
            Login = usuario.Login,
            Email = usuario.Email,
            Aniversario = usuario.Aniversario,
            Nome = usuario.Nome,
            ImagemUrl = usuario.ImagemUrl,
        };

        public async Task<string?> Authenticate(string login, string senha)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.Login == login);
            if (user == null || !VerifyPasswordHash(senha, user.Senha))
            {
                return null;
            }

            // Criar token JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("Nome", user.Nome)
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private static string HashPassword(string password)
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            return $"{Convert.ToBase64String(salt)}:{hashed}";
        }

        private static bool VerifyPasswordHash(string password, string storedHash)
        {
            var parts = storedHash.Split(':');
            if (parts.Length != 2)
            {
                return false;
            }

            var salt = Convert.FromBase64String(parts[0]);
            var storedPasswordHash = parts[1];

            var hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            return hash == storedPasswordHash;
        }

        private static async Task<string?> ProcessarMidiasAsync(IFormFile midia)
        {
            if (midia == null) return null;

            // Define o caminho para a pasta "Cardapio"
            var baseDirectory = Path.Combine("Uploads", "Usuarios");

            // Verifica se a pasta "Cardapio" existe, e a cria caso não exista
            if (!Directory.Exists(baseDirectory))
            {
                Directory.CreateDirectory(baseDirectory);
            }

            // Gera o caminho completo para o arquivo dentro da pasta "Cardapio"
            var filePath = Path.Combine(baseDirectory, Guid.NewGuid() + Path.GetExtension(midia.FileName));

            // Salva o arquivo no caminho especificado
            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await midia.CopyToAsync(stream);
            }

            return filePath;
        }
    }

}
