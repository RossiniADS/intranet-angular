using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConteudosController : ControllerBase
    {
        private readonly IConteudoService _conteudoService;

        public ConteudosController(IConteudoService conteudoService)
        {
            _conteudoService = conteudoService;
        }

        [HttpGet]
        public async Task<IActionResult> ObterTodos()
        {
            var conteudos = await _conteudoService.ObterTodosAsync();
            return Ok(conteudos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var conteudo = await _conteudoService.ObterPorIdAsync(id);
            if (conteudo == null)
                return NotFound("Conteúdo não encontrado.");

            return Ok(conteudo);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] Conteudo conteudo)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _conteudoService.AdicionarAsync(conteudo);
            return CreatedAtAction(nameof(ObterPorId), new { id = conteudo.Id }, conteudo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] Conteudo conteudo)
        {
            if (id != conteudo.Id)
                return BadRequest("ID do conteúdo não coincide.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _conteudoService.AtualizarAsync(conteudo);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Conteúdo não encontrado.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remover(int id)
        {
            try
            {
                await _conteudoService.RemoverAsync(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Conteúdo não encontrado.");
            }

            return NoContent();
        }
    }
}
