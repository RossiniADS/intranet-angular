using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SugestoesController : ControllerBase
    {
        private readonly ISugestaoService _sugestaoService;

        public SugestoesController(ISugestaoService sugestaoService)
        {
            _sugestaoService = sugestaoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var sugestoes = await _sugestaoService.GetAllAsync();
            return Ok(sugestoes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var sugestao = await _sugestaoService.GetByIdAsync(id);
            if (sugestao == null)
            {
                return NotFound();
            }
            return Ok(sugestao);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] SugestaoRequest sugestaoRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdSugestao = await _sugestaoService.AddAsync(sugestaoRequest);
            return CreatedAtAction(nameof(GetById), new { id = createdSugestao.Id }, createdSugestao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SugestaoRequest sugestaoRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedSugestao = await _sugestaoService.UpdateAsync(id, sugestaoRequest);
            return Ok(updatedSugestao);
        }

        [HttpPut("setLida/{id}/{lida}")]
        public async Task<IActionResult> SetLida(int id, bool lida)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedSugestao = await _sugestaoService.SetLidaAsync(id, lida);
            return Ok(updatedSugestao);
        }

        [HttpGet("sugestao-pagination")]
        public async Task<IActionResult> GetAllPagination(string? filter, int page = 1, int pageSize = 10)
        {
            var sugestoes = await _sugestaoService.GetAllPagination(filter, page, pageSize);
            return Ok(sugestoes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _sugestaoService.DeleteAsync(id);
            return NoContent();
        }
    }
}
