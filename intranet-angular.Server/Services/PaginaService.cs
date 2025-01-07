using intranet_angular.Server.Context;
using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Response;
using Microsoft.EntityFrameworkCore;

namespace intranet_angular.Server.Services
{
    public class PaginaService : IPaginaService
    {
        private readonly IntraNetDbContext _context;

        public PaginaService(IntraNetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PaginaResponse>> GetAllAsync()
        {
            return await _context.Paginas
                .Select(p => new PaginaResponse
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Descricao = p.Descricao,
                    ConfiguracoesDeGrupos = p.ConfiguracoesDeGrupos.Select(c => new ConfiguracaoGrupoDeSlideResponse()
                    {
                        Id = c.Id,
                        PaginaId = c.PaginaId,
                        Posicao = c.Posicao,
                        TipoDeMidia = c.TipoDeMidia
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<PaginaResponse?> GetByIdAsync(int id)
        {
            return await _context.Paginas.Where(p => p.Id == id)
                .Select(p => new PaginaResponse
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Descricao = p.Descricao,
                    ConfiguracoesDeGrupos = p.ConfiguracoesDeGrupos.Select(c => new ConfiguracaoGrupoDeSlideResponse()
                    {
                        Id = c.Id,
                        PaginaId = c.PaginaId,
                        Posicao = c.Posicao,
                        TipoDeMidia = c.TipoDeMidia
                    }).ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<PaginaResponse> AddAsync(PaginaRequest paginaRequest)
        {
            var pagina = new Pagina
            {
                Nome = paginaRequest.Nome,
                Descricao = paginaRequest.Descricao,
                ConfiguracoesDeGrupos = paginaRequest.ConfiguracoesDeGrupos.Select(c => new ConfiguracaoGrupoDeSlide
                {
                    Posicao = c.Posicao,
                    TipoDeMidia = c.TipoDeMidia
                }).ToList()
            };

            _context.Paginas.Add(pagina);
            await _context.SaveChangesAsync();

            return new PaginaResponse
            {
                Id = pagina.Id,
                Nome = pagina.Nome,
                ConfiguracoesDeGrupos = pagina.ConfiguracoesDeGrupos.Select(c => new ConfiguracaoGrupoDeSlideResponse
                {
                    Id = c.Id,
                    Posicao = c.Posicao,
                    TipoDeMidia = c.TipoDeMidia
                }).ToList()
            };
        }

        public async Task<PaginaResponse> UpdateAsync(int id, PaginaRequest paginaRequest)
        {
            var pagina = await _context.Paginas
                .Include(p => p.ConfiguracoesDeGrupos)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pagina == null)
            {
                throw new KeyNotFoundException("Página não encontrada.");
            }

            // Atualiza os dados principais da página
            pagina.Nome = paginaRequest.Nome;
            pagina.Descricao = paginaRequest.Descricao;

            // IDs das configurações enviadas na requisição
            var configuracoesIdsRequest = paginaRequest.ConfiguracoesDeGrupos
                .Where(c => c.Id != null && c.Id > 0) // Somente configurações existentes
                .Select(c => c.Id.Value)
                .ToList();

            // Configurações existentes no banco que permanecem
            var configuracoesExistentes = pagina.ConfiguracoesDeGrupos
                .Where(c => configuracoesIdsRequest.Contains(c.Id))
                .ToList();

            // Configurações que devem ser removidas
            var configuracoesParaRemover = pagina.ConfiguracoesDeGrupos
                .Where(c => !configuracoesIdsRequest.Contains(c.Id))
                .ToList();

            // Remover as configurações que não estão no request
            foreach (var config in configuracoesParaRemover)
            {
                pagina.ConfiguracoesDeGrupos.Remove(config);
            }

            // Atualizar as configurações existentes
            foreach (var config in configuracoesExistentes)
            {
                var requestConfig = paginaRequest.ConfiguracoesDeGrupos.First(c => c.Id == config.Id);
                config.Posicao = requestConfig.Posicao;
                config.TipoDeMidia = requestConfig.TipoDeMidia;
            }

            // Adicionar novas configurações
            var novasConfiguracoes = paginaRequest.ConfiguracoesDeGrupos
                .Where(c => c.Id == null || c.Id == 0) // Novas configurações não têm Id
                .Select(c => new ConfiguracaoGrupoDeSlide
                {
                    Posicao = c.Posicao,
                    TipoDeMidia = c.TipoDeMidia
                })
                .ToList();

            foreach (var novaConfig in novasConfiguracoes)
            {
                pagina.ConfiguracoesDeGrupos.Add(novaConfig);
            }

            // Atualizar a página no banco
            _context.Paginas.Update(pagina);
            await _context.SaveChangesAsync();

            // Retornar a resposta
            return new PaginaResponse
            {
                Id = pagina.Id,
                Nome = pagina.Nome,
                ConfiguracoesDeGrupos = pagina.ConfiguracoesDeGrupos.Select(c => new ConfiguracaoGrupoDeSlideResponse
                {
                    Id = c.Id,
                    Posicao = c.Posicao,
                    TipoDeMidia = c.TipoDeMidia
                }).ToList()
            };
        }


        public async Task DeleteAsync(int id)
        {
            var pagina = await _context.Paginas
                .Include(p => p.ConfiguracoesDeGrupos)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pagina == null)
            {
                throw new KeyNotFoundException("Página não encontrada.");
            }

            // Remove a página e suas configurações de grupos
            _context.Paginas.Remove(pagina);

            await _context.SaveChangesAsync();
        }

    }
}
