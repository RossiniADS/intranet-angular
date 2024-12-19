using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Model;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class NoticiaService : INoticiaService
    {
        private readonly IntraNetDbContext _context;

        public NoticiaService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Noticia>> GetAllAsync()
        {
            return await _context.Noticias.ToListAsync();
        }

        public async Task<Noticia> GetByIdAsync(int id)
        {
            return await _context.Noticias.FindAsync(id);
        }

        public async Task<Noticia> AddAsync(NoticiaModel noticiaModel)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Criar a notícia
                var noticia = new Noticia
                {
                    Titulo = noticiaModel.Titulo,
                    Conteudo = noticiaModel.Conteudo,
                    DataPublicacao = noticiaModel.DataPublicacao,
                    AutorId = noticiaModel.AutorId,
                    NoticiasCategorias = noticiaModel.CategoriaIds?.Select(id => new NoticiaCategoria { CategoriaId = id }).ToList()
                };

                _context.Noticias.Add(noticia);
                await _context.SaveChangesAsync();

                // Processar os arquivos de mídia
                if (noticiaModel.Midias != null && noticiaModel.Midias.Count > 0)
                {
                    foreach (var file in noticiaModel.Midias)
                    {
                        var filePath = Path.Combine("Uploads", Guid.NewGuid() + Path.GetExtension(file.FileName));

                        // Salvar arquivo no servidor
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        // Salvar URL na tabela MidiaNoticia
                        var midiaNoticia = new MidiaNoticia
                        {
                            URL = filePath,
                            NoticiaId = noticia.Id,
                            Ordem = 1,
                            Tipo = Enuns.TipoMidiaEnum.Imagem
                        };

                        _context.MidiasNoticias.Add(midiaNoticia);
                    }

                    await _context.SaveChangesAsync();
                }

                await transaction.CommitAsync();
                return noticia;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<Noticia> UpdateAsync(int id, NoticiaModel noticiaModel)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Obter a notícia existente
                var noticia = await _context.Noticias
                    .Include(n => n.NoticiasCategorias)
                    .Include(n => n.Midias)
                    .FirstOrDefaultAsync(n => n.Id == id);

                if (noticia == null)
                    throw new KeyNotFoundException("Notícia não encontrada.");

                // Atualizar os campos da notícia
                noticia.Titulo = noticiaModel.Titulo;
                noticia.Conteudo = noticiaModel.Conteudo;
                noticia.DataPublicacao = noticiaModel.DataPublicacao;
                noticia.AutorId = noticiaModel.AutorId;

                // Atualizar as categorias
                noticia.NoticiasCategorias.Clear();
                if (noticiaModel.CategoriaIds != null && noticiaModel.CategoriaIds.Any())
                {
                    noticia.NoticiasCategorias = noticiaModel.CategoriaIds
                        .Select(id => new NoticiaCategoria { CategoriaId = id, NoticiaId = noticia.Id })
                        .ToList();
                }

                // Atualizar arquivos de mídia
                if (noticiaModel.Midias != null && noticiaModel.Midias.Count > 0)
                {
                    // Remover mídias existentes
                    foreach (var midia in noticia.Midias)
                    {
                        var filePath = midia.URL;
                        if (File.Exists(filePath))
                        {
                            File.Delete(filePath);
                        }
                    }
                    _context.MidiasNoticias.RemoveRange(noticia.Midias);

                    // Adicionar novas mídias
                    foreach (var file in noticiaModel.Midias)
                    {
                        var filePath = Path.Combine("Uploads", Guid.NewGuid() + Path.GetExtension(file.FileName));

                        // Salvar arquivo no servidor
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var midiaNoticia = new MidiaNoticia
                        {
                            URL = filePath,
                            NoticiaId = noticia.Id
                        };

                        _context.MidiasNoticias.Add(midiaNoticia);
                    }
                }

                // Salvar as alterações
                _context.Noticias.Update(noticia);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return noticia;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task DeleteAsync(int id)
        {
            var noticia = await _context.Noticias.FindAsync(id);
            if (noticia != null)
            {
                _context.Noticias.Remove(noticia);
                await _context.SaveChangesAsync();
            }
        }
    }

}
