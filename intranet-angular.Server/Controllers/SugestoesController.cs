using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
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
        public async Task<IActionResult> GetAll()
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _sugestaoService.DeleteAsync(id);
            return NoContent();
        }
    }
}
