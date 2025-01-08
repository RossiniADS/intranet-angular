using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class EventoService : IEventoService
    {
        private readonly IntraNetDbContext _context;

        public EventoService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EventoResponse>> GetAllAsync()
        {
            var evento = await _context.Eventos.ToListAsync();
            return evento.Select(MapToResponse);
        }

        public async Task<EventoResponse?> GetByIdAsync(int id)
        {
            var evento = await _context.Eventos.FindAsync(id);
            return evento == null ? null : MapToResponse(evento);
        }

        public async Task<EventoResponse> AddAsync(EventoRequest eventoRequest)
        {
            var evento = new Evento()
            {
                Nome = eventoRequest.Nome,
                DataInicio = eventoRequest.DataInicio,
                Descricao = eventoRequest.Descricao,
                DataFim = eventoRequest.DataFim,
                Localizacao = eventoRequest.Localizacao,
                ImagemUrl = await ProcessarMidiasAsync(eventoRequest.File)
            };

            _context.Eventos.Add(evento);
            await _context.SaveChangesAsync();

            return MapToResponse(evento);
        }

        public async Task<EventoResponse> UpdateAsync(int id, EventoRequest eventoRequest)
        {
            var evento = await _context.Eventos.FindAsync(id);
            if (evento == null)
            {
                throw new KeyNotFoundException("Evento não encontrado.");
            }

            evento.Nome = eventoRequest.Nome;
            evento.DataInicio = eventoRequest.DataInicio;
            evento.Descricao = eventoRequest.Descricao;
            evento.DataFim = eventoRequest.DataFim;
            evento.Localizacao = eventoRequest.Localizacao;

            if (!string.IsNullOrEmpty(evento.ImagemUrl) && eventoRequest.File != null)
            {
                if (File.Exists(evento.ImagemUrl))
                {
                    File.Delete(evento.ImagemUrl);
                }
            }

            if (eventoRequest.File != null)
            {
                evento.ImagemUrl = await ProcessarMidiasAsync(eventoRequest.File);
            }

            _context.Eventos.Update(evento);
            await _context.SaveChangesAsync();

            return MapToResponse(evento);
        }

        public async Task DeleteAsync(int id)
        {
            var evento = await _context.Eventos.FindAsync(id);
            if (evento != null)
            {
                if (File.Exists(evento.ImagemUrl))
                {
                    File.Delete(evento.ImagemUrl);
                }

                _context.Eventos.Remove(evento);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<BaseResponse<IEnumerable<EventoResponse>>> GetAllPagination(int page = 1, int pageSize = 10)
        {
            var query = _context.Eventos.AsQueryable();

            var totalRecords = await query.CountAsync();

            var eventos = await query
                .OrderByDescending(s => s.DataInicio)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(s => MapToResponse(s))
                .ToListAsync();

            return new BaseResponse<IEnumerable<EventoResponse>>
            {
                TotalRecords = totalRecords,
                Data = eventos
            };
        }

        private static async Task<string?> ProcessarMidiasAsync(IFormFile midia)
        {
            if (midia == null) return null;

            // Define o caminho para a pasta "Eventos"
            var baseDirectory = Path.Combine("Uploads", "Eventos");

            // Verifica se a pasta "Eventos" existe, e a cria caso não exista
            if (!Directory.Exists(baseDirectory))
            {
                Directory.CreateDirectory(baseDirectory);
            }

            // Gera o caminho completo para o arquivo dentro da pasta "Eventos"
            var filePath = Path.Combine(baseDirectory, Guid.NewGuid() + Path.GetExtension(midia.FileName));

            // Salva o arquivo no caminho especificado
            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await midia.CopyToAsync(stream);
            }

            return filePath;
        }


        private static EventoResponse MapToResponse(Evento evento) => new EventoResponse
        {
            Id = evento.Id,
            Nome = evento.Nome,
            DataInicio = evento.DataInicio,
            Descricao = evento.Descricao,
            DataFim = evento.DataFim,
            Localizacao = evento.Localizacao,
            ImagemUrl = evento.ImagemUrl
        };
    }

}
