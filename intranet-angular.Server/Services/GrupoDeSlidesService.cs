﻿using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class GrupoDeSlidesService : IGrupoDeSlidesService
    {
        private readonly IntraNetDbContext _context;

        public GrupoDeSlidesService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GrupoDeSlideResponse>> GetAllAsync()
        {
            return await _context.GrupoDeSlides
                .Include(g => g.Autor)
                .Include(g => g.Slides)
                .ThenInclude(g => g.Noticia)
                .ThenInclude(g => g.NoticiasCategorias)
                .ThenInclude(g => g.Categoria)
                .Select(g => ToNoticiaResponse(g, g.Slides.ToList()))
                .ToListAsync();
        }

        public async Task<GrupoDeSlideResponse?> GetByIdAsync(int id)
        {
            return await _context.GrupoDeSlides
                .Where(p => p.Id == id)
                .Include(g => g.Autor)
                .Include(g => g.Slides)
                .ThenInclude(g => g.Noticia)
                .ThenInclude(g => g.NoticiasCategorias)
                .ThenInclude(g => g.Categoria)
                .Select(g => ToNoticiaResponse(g, g.Slides.ToList()))
                .FirstOrDefaultAsync();
        }

        public async Task<List<GrupoDeSlideResponse>> GetByPageIdAsync(int pageId)
        {
            return await _context.GrupoDeSlides
                .Where(p => p.PaginaId == pageId)
                .Include(g => g.Autor)
                .Include(g => g.Slides)
                .ThenInclude(g => g.Noticia)
                .ThenInclude(g => g.NoticiasCategorias)
                .ThenInclude(g => g.Categoria)
                .Select(g => ToNoticiaResponse(g, g.Slides.ToList()))
                .ToListAsync();
        }

        public async Task<List<GrupoDeSlideResponse>> AddAsync(List<GrupoDeSlideRequest> grupoDeSlideRequests)
        {
            var responses = new List<GrupoDeSlideResponse>();
            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                foreach (var grupoDeSlideRequest in grupoDeSlideRequests)
                {
                    var grupoDeSlides = new GrupoDeSlides
                    {
                        Nome = grupoDeSlideRequest.Nome,
                        PaginaId = grupoDeSlideRequest.PaginaId,
                        Posicao = grupoDeSlideRequest.Posicao,
                        AutorId = grupoDeSlideRequest.AutorId
                    };

                    var slidesRequest = grupoDeSlideRequest.Slides.ToList();

                    _context.GrupoDeSlides.Add(grupoDeSlides);
                    await _context.SaveChangesAsync();

                    var slides = slidesRequest.Select(slideRequest => new Slide
                    {
                        Descricao = slideRequest.Descricao,
                        Ordem = slideRequest.Ordem,
                        Tipo = slideRequest.Tipo,
                        Titulo = slideRequest.Titulo,
                        URL = ProcessarSlidesAsync(slideRequest.File).Result,
                        GrupoDeSlidesId = grupoDeSlides.Id,
                        NoticiaId = slideRequest.NoticiaId
                    }).ToList();

                    _context.Slides.AddRange(slides);
                    await _context.SaveChangesAsync();

                    var response = ToNoticiaResponse(grupoDeSlides, slides);
                    responses.Add(response);
                }

                await transaction.CommitAsync();
                return responses;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<GrupoDeSlideResponse> UpdateAsync(int id, GrupoDeSlideRequest grupoDeSlideRequest)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var grupoDeSlides = await _context.GrupoDeSlides
                    .Include(gs => gs.Slides)
                    .Include(gs => gs.Autor)
                    .FirstOrDefaultAsync(gs => gs.Id == id);

                if (grupoDeSlides == null)
                    throw new KeyNotFoundException("Grupo de slides não encontrado.");

                // Atualizar propriedades do grupo de slides
                grupoDeSlides.Nome = grupoDeSlideRequest.Nome;
                grupoDeSlides.PaginaId = grupoDeSlideRequest.PaginaId;
                grupoDeSlides.Posicao = grupoDeSlideRequest.Posicao;
                grupoDeSlides.AutorId = grupoDeSlideRequest.AutorId;

                // Atualizar slides existentes e remover os que não estão no request
                var slidesIdsRequest = grupoDeSlideRequest.Slides
                    .Where(s => s.Id != null && s.Id > 0) // Somente slides existentes
                    .Select(s => s.Id)
                    .ToList();

                var slidesExistentes = grupoDeSlides.Slides
                    .Where(s => slidesIdsRequest.Contains(s.Id))
                    .ToList();

                var slidesParaRemover = grupoDeSlides.Slides
                    .Where(s => !slidesIdsRequest.Contains(s.Id))
                    .ToList();

                _context.Slides.RemoveRange(slidesParaRemover);

                foreach (var slideExistente in slidesExistentes)
                {
                    var slideRequest = grupoDeSlideRequest.Slides.First(s => s.Id == slideExistente.Id);
                    slideExistente.Descricao = slideRequest.Descricao;
                    slideExistente.Ordem = slideRequest.Ordem;
                    slideExistente.Tipo = slideRequest.Tipo;
                    slideExistente.Titulo = slideRequest.Titulo;
                    slideExistente.NoticiaId = slideRequest.NoticiaId;

                    if (slideRequest.File != null)
                    {
                        if (!string.IsNullOrEmpty(slideExistente.URL) && File.Exists(slideExistente.URL))
                            File.Delete(slideExistente.URL);

                        slideExistente.URL = await ProcessarSlidesAsync(slideRequest.File);
                    }
                }

                // Adicionar novos slides
                var novosSlides = grupoDeSlideRequest.Slides
                    .Where(s => s.Id == null)
                    .Select(async slideRequest => new Slide
                    {
                        Descricao = slideRequest.Descricao,
                        Ordem = slideRequest.Ordem,
                        Tipo = slideRequest.Tipo,
                        Titulo = slideRequest.Titulo,
                        URL = await ProcessarSlidesAsync(slideRequest.File),
                        GrupoDeSlidesId = grupoDeSlides.Id,
                        NoticiaId = slideRequest.NoticiaId,
                    });

                var slidesAdicionados = await Task.WhenAll(novosSlides);
                _context.Slides.AddRange(slidesAdicionados);

                // Atualizar grupo de slides
                _context.GrupoDeSlides.Update(grupoDeSlides);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return ToNoticiaResponse(grupoDeSlides, [.. grupoDeSlides.Slides]);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }


        public async Task DeleteAsync(int id)
        {
            var grupoDeSlides = await _context.GrupoDeSlides
                .Include(n => n.Slides)
                .FirstOrDefaultAsync(n => n.Id == id);

            if (grupoDeSlides == null) throw new KeyNotFoundException("Notícia não encontrada.");

            foreach (var slide in grupoDeSlides.Slides)
            {
                if (File.Exists(slide.URL))
                {
                    File.Delete(slide.URL);
                }
            }

            _context.GrupoDeSlides.Remove(grupoDeSlides);
            await _context.SaveChangesAsync();
        }

        private static GrupoDeSlideResponse ToNoticiaResponse(GrupoDeSlides grupoDeSlides, List<Slide> slide) => new()
        {
            Id = grupoDeSlides.Id,
            Nome = grupoDeSlides.Nome,
            PaginaId = grupoDeSlides.PaginaId,
            Posicao = grupoDeSlides.Posicao,
            AutorId = grupoDeSlides.AutorId,
            DataPublicacao = grupoDeSlides.DataPublicacao,
            Autor = grupoDeSlides?.Autor?.Nome,
            AutorUrl = grupoDeSlides?.Autor?.ImagemUrl,
            Slides = slide.Select(slide => new SlideResponse()
            {
                Id = slide.Id,
                Descricao = slide.Descricao,
                URL = slide.URL,
                GrupoDeSlidesId = grupoDeSlides.Id,
                Ordem = slide.Ordem,
                Tipo = slide.Tipo,
                Titulo = slide.Titulo,
                NoticiaId = slide.NoticiaId,
                CategoriaNomes = slide.Noticia?.NoticiasCategorias?.Select(nc => nc.Categoria?.Nome).ToList()
            }).ToList(),
        };

        private static async Task<string> ProcessarSlidesAsync(IFormFile? midia)
        {
            if (midia == null) return string.Empty;

            // Define o caminho para a pasta "Slides"
            var baseDirectory = Path.Combine("Uploads", "Slides");

            // Verifica se a pasta "Slides" existe, e a cria caso não exista
            if (!Directory.Exists(baseDirectory))
            {
                Directory.CreateDirectory(baseDirectory);
            }

            // Gera o caminho completo para o arquivo dentro da pasta "Slides"
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
