using intranet_angular.Server.Context;
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
                .Select(g => new GrupoDeSlideResponse
                {
                    Id = g.Id,
                    Nome = g.Nome,
                    PaginaId = g.PaginaId
                })
                .ToListAsync();
        }

        public async Task<GrupoDeSlideResponse?> GetByIdAsync(int id)
        {
            return await _context.GrupoDeSlides.Where(p => p.Id == id)
                .Select(g => new GrupoDeSlideResponse
                {
                    Id = g.Id,
                    Nome = g.Nome,
                    PaginaId = g.PaginaId
                })
                .FirstOrDefaultAsync();
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
                        URL = ProcessarSlidesAsync(slideRequest.File, grupoDeSlides.Id).Result,
                        GrupoDeSlidesId = grupoDeSlides.Id
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
                    .FirstOrDefaultAsync(gs => gs.Id == id);

                if (grupoDeSlides == null)
                    throw new KeyNotFoundException("Grupo de slides não encontrado.");

                // Atualizar propriedades do grupo de slides
                grupoDeSlides.Nome = grupoDeSlideRequest.Nome;
                grupoDeSlides.PaginaId = grupoDeSlideRequest.PaginaId;

                // Atualizar slides existentes e remover os que não estão no request
                var slidesIdsRequest = grupoDeSlideRequest.Slides.Select(s => s.Id).ToList();
                var slidesExistentes = grupoDeSlides.Slides.Where(s => slidesIdsRequest.Contains(s.Id)).ToList();
                var slidesParaRemover = grupoDeSlides.Slides.Except(slidesExistentes).ToList();

                _context.Slides.RemoveRange(slidesParaRemover);

                foreach (var slideExistente in slidesExistentes)
                {
                    var slideRequest = grupoDeSlideRequest.Slides.First(s => s.Id == slideExistente.Id);
                    slideExistente.Descricao = slideRequest.Descricao;
                    slideExistente.Ordem = slideRequest.Ordem;
                    slideExistente.Tipo = slideRequest.Tipo;
                    slideExistente.Titulo = slideRequest.Titulo;

                    if (slideRequest.File != null)
                    {
                        if (File.Exists(slideExistente.URL))
                            File.Delete(slideExistente.URL);

                        slideExistente.URL = await ProcessarSlidesAsync(slideRequest.File, grupoDeSlides.Id);
                    }
                }

                // Adicionar novos slides
                var novosSlides = grupoDeSlideRequest.Slides
                    .Where(s => s.Id == 0)
                    .Select(slideRequest => new Slide
                    {
                        Descricao = slideRequest.Descricao,
                        Ordem = slideRequest.Ordem,
                        Tipo = slideRequest.Tipo,
                        Titulo = slideRequest.Titulo,
                        URL = ProcessarSlidesAsync(slideRequest.File, grupoDeSlides.Id).Result,
                        GrupoDeSlidesId = grupoDeSlides.Id
                    }).ToList();

                _context.Slides.AddRange(novosSlides);

                // Atualizar grupo de slides
                _context.GrupoDeSlides.Update(grupoDeSlides);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return ToNoticiaResponse(grupoDeSlides, grupoDeSlides.Slides.ToList());
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
            Slides = slide.Select(slide => new SlideResponse()
            {
                Id = slide.Id,
                Descricao = slide.Descricao,
                URL = slide.URL,
                GrupoDeSlidesId = grupoDeSlides.Id,
                Ordem = slide.Ordem,
                Tipo = slide.Tipo,
                Titulo = slide.Titulo
            }).ToList(),
        };

        private static async Task<string> ProcessarSlidesAsync(IFormFile? slide, int grupoSlideId)
        {
            if (slide == null) return string.Empty;

            var filePath = Path.Combine("Uploads", Guid.NewGuid() + Path.GetExtension(slide.FileName));

            Directory.CreateDirectory(Path.GetDirectoryName(filePath) ?? "Uploads");

            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await slide.CopyToAsync(stream);
            }

            return filePath;
        }
    }
}
