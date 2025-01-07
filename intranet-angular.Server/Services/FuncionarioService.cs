using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class FuncionarioService : IFuncionarioService
    {
        private readonly IntraNetDbContext _context;

        public FuncionarioService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FuncionarioResponse>> GetAllAsync()
        {
            var funcionarios = await _context.Funcionarios.ToListAsync();
            return funcionarios.Select(MapToResponse);
        }

        public async Task<FuncionarioResponse> GetByIdAsync(int id)
        {
            var funcionario = await _context.Funcionarios.FindAsync(id);
            return funcionario == null ? null : MapToResponse(funcionario);
        }

        public async Task<FuncionarioResponse> AddAsync(FuncionarioRequest funcionarioRequest)
        {
            var funcionario = new Funcionario()
            {
                Email = funcionarioRequest.Email,
                Cargo = funcionarioRequest.Cargo,
                DataNascimento = funcionarioRequest.DataNascimento,
                Departamento = funcionarioRequest.Departamento,
                ImagemUrl = await ProcessarMidiasAsync(funcionarioRequest.File),
                Nome = funcionarioRequest.Nome
            };

            _context.Funcionarios.Add(funcionario);
            await _context.SaveChangesAsync();

            return MapToResponse(funcionario);
        }

        public async Task<FuncionarioResponse> UpdateAsync(int id, FuncionarioRequest funcionarioRequest)
        {
            var funcionario = await _context.Funcionarios.FindAsync(id);
            if (funcionario == null)
            {
                throw new KeyNotFoundException("Funcionario não encontrado.");
            }

            funcionario.Email = funcionarioRequest.Email;
            funcionario.Cargo = funcionarioRequest.Cargo;
            funcionario.DataNascimento = funcionarioRequest.DataNascimento;
            funcionario.Departamento = funcionarioRequest.Departamento;
            funcionario.Nome = funcionarioRequest.Nome;

            if (!string.IsNullOrEmpty(funcionario.ImagemUrl) && funcionarioRequest.File != null)
            {
                if (File.Exists(funcionario.ImagemUrl))
                {
                    File.Delete(funcionario.ImagemUrl);
                }
            }

            if (funcionarioRequest.File != null)
            {
                funcionario.ImagemUrl = await ProcessarMidiasAsync(funcionarioRequest.File);
            }

            _context.Funcionarios.Update(funcionario);
            await _context.SaveChangesAsync();

            return MapToResponse(funcionario);
        }

        public async Task DeleteAsync(int id)
        {
            var funcionario = await _context.Funcionarios.FindAsync(id);
            if (funcionario != null)
            {
                if (File.Exists(funcionario.ImagemUrl))
                {
                    File.Delete(funcionario.ImagemUrl);
                }

                _context.Funcionarios.Remove(funcionario);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<BaseResponse<IEnumerable<FuncionarioResponse>>> GetAllPagination(int page = 1, int pageSize = 10)
        {
            var query = _context.Funcionarios.AsQueryable();

            var totalRecords = await query.CountAsync();

            var funcionarios = await query
                .OrderBy(s => s.Nome)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(s => MapToResponse(s))
                .ToListAsync();

            return new BaseResponse<IEnumerable<FuncionarioResponse>>
            {
                TotalRecords = totalRecords,
                Data = funcionarios
            };
        }

        private static async Task<string?> ProcessarMidiasAsync(IFormFile midia)
        {
            if (midia == null) return null;

            var filePath = Path.Combine("Uploads", Guid.NewGuid() + Path.GetExtension(midia.FileName));
            var directoryPath = Path.GetDirectoryName(filePath);

            if (directoryPath != null && !Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await midia.CopyToAsync(stream);
            }

            return filePath;
        }

        private static FuncionarioResponse MapToResponse(Funcionario funcionario) => new()
        {
            Id = funcionario.Id,
            Nome = funcionario.Nome,
            Email = funcionario.Email,
            Cargo = funcionario.Cargo,
            DataNascimento = funcionario.DataNascimento,
            Departamento = funcionario.Departamento,
            ImagemUrl = funcionario.ImagemUrl
        };

    }
}
