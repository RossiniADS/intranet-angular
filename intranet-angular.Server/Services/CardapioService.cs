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
    public class CardapioService : ICardapioService
    {
        private readonly IntraNetDbContext _context;

        public CardapioService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CardapioResponse>> GetAllAsync()
        {
            var cardapios = await _context.Cardapios.ToListAsync();
            return cardapios.Select(MapToResponse);
        }

        public async Task<CardapioResponse?> GetByIdAsync(int id)
        {
            var cardapio = await _context.Cardapios.FindAsync(id);
            return cardapio == null ? null : MapToResponse(cardapio);
        }

        public async Task<CardapioResponse> AddAsync(CardapioRequest cardapioRequest)
        {
            var cardapio = new Cardapio
            {
                Descricao = cardapioRequest.Descricao,
                DiaDaSemana = cardapioRequest.DiaDaSemana,
                ImagemUrl = await ProcessarMidiasAsync(cardapioRequest.File),
                Titulo = cardapioRequest.Titulo
            };

            _context.Cardapios.Add(cardapio);
            await _context.SaveChangesAsync();

            return MapToResponse(cardapio);
        }

        public async Task<CardapioResponse> UpdateAsync(int id, CardapioRequest cardapioRequest)
        {
            var cardapio = await _context.Cardapios.FindAsync(id);
            if (cardapio == null)
            {
                throw new KeyNotFoundException("Cardapio não encontrado.");
            }

            cardapio.Descricao = cardapioRequest.Descricao;
            cardapio.DiaDaSemana = cardapioRequest.DiaDaSemana;
            cardapio.Titulo = cardapioRequest.Titulo;

            if (!string.IsNullOrEmpty(cardapio.ImagemUrl) && cardapioRequest.File != null)
            {
                if (File.Exists(cardapio.ImagemUrl))
                {
                    File.Delete(cardapio.ImagemUrl);
                }
            }

            if (cardapioRequest.File != null)
            {
                cardapio.ImagemUrl = await ProcessarMidiasAsync(cardapioRequest.File);
            }

            _context.Cardapios.Update(cardapio);
            await _context.SaveChangesAsync();

            return MapToResponse(cardapio);
        }

        public async Task DeleteAsync(int id)
        {
            var cardapio = await _context.Cardapios.FindAsync(id);
            if (cardapio != null)
            {
                if (File.Exists(cardapio.ImagemUrl))
                {
                    File.Delete(cardapio.ImagemUrl);
                }

                _context.Cardapios.Remove(cardapio);
                await _context.SaveChangesAsync();
            }
        }

        private static async Task<string?> ProcessarMidiasAsync(IFormFile midia)
        {
            if (midia == null) return null;

            // Define o caminho para a pasta "Cardapio"
            var baseDirectory = Path.Combine("Uploads", "Cardapios");

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

        private static CardapioResponse MapToResponse(Cardapio cardapio) => new CardapioResponse
        {
            Id = cardapio.Id,
            Descricao = cardapio.Descricao,
            DiaDaSemana = cardapio.DiaDaSemana,
            ImagemUrl = cardapio.ImagemUrl,
            Titulo = cardapio.Titulo
        };
    }
}
