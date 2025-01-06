using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;

namespace intranet_angular.Server.Services
{
    public class SugestaoService : ISugestaoService
    {
        private readonly IntraNetDbContext _context;

        public SugestaoService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SugestaoResponse>> GetAllAsync()
        {
            var sugestoes = await _context.Sugestaos.ToListAsync();
            return sugestoes.Select(MapToResponse);
        }

        public async Task<SugestaoResponse?> GetByIdAsync(int id)
        {
            var sugestao = await _context.Sugestaos.FindAsync(id);
            return sugestao == null ? null : MapToResponse(sugestao);
        }

        public async Task<SugestaoResponse> AddAsync(SugestaoRequest sugestaoRequest)
        {
            var sugestao = new Sugestao
            {
                Assunto = sugestaoRequest.Assunto,
                Celular = sugestaoRequest.Celular,
                CriadaEm = DateTime.Now,
                Email = sugestaoRequest.Email,
                Lida = false,
                LidaEm = null,
                Mensagem = sugestaoRequest.Mensagem,
                Nome = sugestaoRequest.Nome
            };

            _context.Sugestaos.Add(sugestao);
            await _context.SaveChangesAsync();

            return MapToResponse(sugestao);
        }

        public async Task<SugestaoResponse> UpdateAsync(int id, SugestaoRequest sugestaoRequest)
        {
            var sugestao = await _context.Sugestaos.FindAsync(id);
            if (sugestao == null)
            {
                throw new KeyNotFoundException("Sugestao não encontrado.");
            }

            sugestao.Assunto = sugestaoRequest.Assunto;
            sugestao.Celular = sugestaoRequest.Celular;
            sugestao.Email = sugestaoRequest.Email;
            sugestao.LidaEm = DateTime.Now;
            sugestao.Mensagem = sugestaoRequest.Mensagem;
            sugestao.Nome = sugestaoRequest.Nome;


            _context.Sugestaos.Update(sugestao);
            await _context.SaveChangesAsync();

            return MapToResponse(sugestao);
        }

        public async Task DeleteAsync(int id)
        {
            var sugestao = await _context.Sugestaos.FindAsync(id);
            if (sugestao != null)
            {
                _context.Sugestaos.Remove(sugestao);
                await _context.SaveChangesAsync();
            }
        }

        private static SugestaoResponse MapToResponse(Sugestao sugestao) => new SugestaoResponse
        {
            Id = sugestao.Id,
            Assunto = sugestao.Assunto,
            Celular = sugestao.Celular,
            CriadaEm = sugestao.CriadaEm,
            Email = sugestao.Email,
            Lida = sugestao.Lida,
            LidaEm = sugestao.LidaEm,
            Mensagem = sugestao.Mensagem,
            Nome = sugestao.Nome
        };
    }
}
