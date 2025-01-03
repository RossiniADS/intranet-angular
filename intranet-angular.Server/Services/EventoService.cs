﻿using intranet_angular.Server.Context;
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
