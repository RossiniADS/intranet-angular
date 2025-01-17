﻿using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Enuns;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace intranet_angular.Server.Services
{
    public class NoticiaService : INoticiaService
    {
        private readonly IntraNetDbContext _context;

        public NoticiaService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<NoticiaResponse>> GetAllAsync()
        {
            return await _context.Noticias
                .Include(n => n.Autor)
                .Include(n => n.Midias)
                .Include(n => n.NoticiasCategorias)
                .ThenInclude(c => c.Categoria)
                .Select(n => ToNoticiaResponse(n))
                .ToListAsync();
        }

        public async Task<BaseResponse<IEnumerable<NoticiaResponse>>> GetAllPagination(string? filter, int page = 1, int pageSize = 10)
        {
            var query = _context.Noticias
                .Include(n => n.Autor)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter))
            {
                query = query.Where(s =>
                    (!string.IsNullOrEmpty(s.Titulo) && s.Titulo.Contains(filter)) ||
                    (!string.IsNullOrEmpty(s.Conteudo) && s.Conteudo.Contains(filter)) ||
                    (!string.IsNullOrEmpty(s.Descricao) && s.Descricao.Contains(filter)) ||
                    (!string.IsNullOrEmpty(s.Autor.Nome) && s.Autor.Nome.Contains(filter))
                );
            }

            var totalRecords = await query.CountAsync();

            var noticias = await query
                .Include(n => n.Midias)
                .Include(n => n.NoticiasCategorias)
                .ThenInclude(c => c.Categoria)
                .Select(n => ToNoticiaResponse(n))
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new BaseResponse<IEnumerable<NoticiaResponse>>
            {
                TotalRecords = totalRecords,
                Data = noticias
            };
        }

        public async Task<NoticiaResponse?> GetByIdAsync(int id)
        {
            return await _context.Noticias
                .Include(n => n.Midias)
                .Include(n => n.Autor)
                .Include(n => n.NoticiasCategorias)
                .ThenInclude(c => c.Categoria)
                .Where(n => n.Id == id)
                .Select(n => ToNoticiaResponse(n))
                .FirstOrDefaultAsync();
        }

        public async Task<NoticiaResponse> AddAsync(NoticiaRequest noticiaRequest)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var noticia = new Noticia
                {
                    Titulo = noticiaRequest.Titulo,
                    Conteudo = noticiaRequest.Conteudo,
                    Descricao = noticiaRequest.Descricao,
                    IsTrendingTop = noticiaRequest.IsTrendingTop,
                    AutorId = noticiaRequest.AutorId,
                    NoticiasCategorias = noticiaRequest.CategoriaIds?.Select(id => new NoticiaCategoria { CategoriaId = id }).ToList()
                };

                _context.Noticias.Add(noticia);
                await _context.SaveChangesAsync();

                if (noticiaRequest.MidiaPrincipal != null)
                    await ProcessarMidiasAsync(noticiaRequest.MidiaPrincipal, MidiaTamanhoEnum.Principal, noticia.Id);

                if (noticiaRequest.MidiaSecundaria != null)
                    await ProcessarMidiasAsync(noticiaRequest.MidiaSecundaria, MidiaTamanhoEnum.Secundaria, noticia.Id);

                if (noticiaRequest.MidiaTerciaria != null)
                    await ProcessarMidiasAsync(noticiaRequest.MidiaTerciaria, MidiaTamanhoEnum.Terciaria, noticia.Id);

                await transaction.CommitAsync();

                return ToNoticiaResponse(noticia);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<NoticiaResponse> UpdateAsync(int id, NoticiaRequest noticiaRequest)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var noticia = await _context.Noticias
                    .Include(n => n.Autor)
                    .Include(n => n.NoticiasCategorias)
                    .ThenInclude(c => c.Categoria)
                    .Include(n => n.Midias)
                    .FirstOrDefaultAsync(n => n.Id == id) ?? throw new KeyNotFoundException("Notícia não encontrada.");

                noticia.Titulo = noticiaRequest.Titulo;
                noticia.Descricao = noticiaRequest.Descricao;
                noticia.Conteudo = noticiaRequest.Conteudo;
                noticia.IsTrendingTop = noticiaRequest.IsTrendingTop;
                noticia.AutorId = noticiaRequest.AutorId;

                noticia.NoticiasCategorias = noticiaRequest.CategoriaIds?.Select(id =>
                    new NoticiaCategoria { CategoriaId = id, NoticiaId = noticia.Id }
                ).ToList() ?? [];

                if (noticia.Midias.Count > 0 && noticiaRequest.MidiaPrincipal != null)
                {
                    foreach (var midia in noticia.Midias)
                    {
                        if (File.Exists(midia.URL))
                            File.Delete(midia.URL);
                    }

                    _context.MidiasNoticias.RemoveRange(noticia.Midias);
                }

                if (noticiaRequest.MidiaPrincipal != null)
                    await ProcessarMidiasAsync(noticiaRequest.MidiaPrincipal, MidiaTamanhoEnum.Principal, noticia.Id);

                //if (noticiaRequest.MidiaSecundaria != null)
                //    await ProcessarMidiasAsync(noticiaRequest.MidiaSecundaria, MidiaTamanhoEnum.Secundaria, noticia.Id);

                //if (noticiaRequest.MidiaTerciaria != null)
                //    await ProcessarMidiasAsync(noticiaRequest.MidiaTerciaria, MidiaTamanhoEnum.Terciaria, noticia.Id);

                _context.Noticias.Update(noticia);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return ToNoticiaResponse(noticia);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task DeleteAsync(int id)
        {
            var noticia = await _context.Noticias
                .Include(n => n.Midias)
                .FirstOrDefaultAsync(n => n.Id == id);

            if (noticia == null) throw new KeyNotFoundException("Notícia não encontrada.");

            foreach (var midia in noticia.Midias)
            {
                if (File.Exists(midia.URL))
                {
                    File.Delete(midia.URL);
                }
            }

            _context.Noticias.Remove(noticia);
            await _context.SaveChangesAsync();
        }

        private static NoticiaResponse ToNoticiaResponse(Noticia noticia) => new()
        {
            Id = noticia.Id,
            Titulo = noticia.Titulo,
            Descricao = noticia.Descricao,
            AutorId = noticia.AutorId,
            Autor = noticia?.Autor?.Nome,
            Categoria = noticia.NoticiasCategorias
            .Where(cat => cat.Categoria != null)
            .Select(cat => new CategoriaResponse
            {
                Id = cat.Categoria.Id,
                Nome = cat.Categoria.Nome
            }).ToList(),
            Conteudo = noticia.Conteudo,
            IsTrendingTop = noticia.IsTrendingTop,
            DataPublicacao = noticia.DataPublicacao,
            MidiaNoticia = noticia.Midias.Select(m => new MidiaNoticiaResponse
            {
                Id = m.Id,
                MidiaTamanho = m.MidiaTamanho,
                NoticiaId = m.NoticiaId,
                Tipo = m.Tipo,
                URL = m.URL
            }).ToList()
        };

        private async Task ProcessarMidiasAsync(IFormFile midia, MidiaTamanhoEnum midiaTamanho, int noticiaId)
        {
            if (midia == null) return;

            // Define o caminho para a pasta "Noticias"
            var baseDirectory = Path.Combine("Uploads", "Noticias");

            // Verifica se a pasta "Noticias" existe, e a cria caso não exista
            if (!Directory.Exists(baseDirectory))
            {
                Directory.CreateDirectory(baseDirectory);
            }

            // Gera o caminho completo para o arquivo dentro da pasta "Noticias"
            var filePath = Path.Combine(baseDirectory, Guid.NewGuid() + Path.GetExtension(midia.FileName));

            // Salva o arquivo no caminho especificado
            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await midia.CopyToAsync(stream);
            }

            _context.MidiasNoticias.Add(new MidiaNoticia
            {
                URL = filePath,
                NoticiaId = noticiaId,
                MidiaTamanho = midiaTamanho,
                Tipo = TipoMidiaEnum.Imagem
            });

            await _context.SaveChangesAsync();
        }
    }
}
