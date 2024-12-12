using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogAlteracaoController : ControllerBase
    {
        private readonly ILogAlteracaoService _logAlteracaoService;

        public LogAlteracaoController(ILogAlteracaoService logAlteracaoService)
        {
            _logAlteracaoService = logAlteracaoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var logs = await _logAlteracaoService.GetAllAsync();
            return Ok(logs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var log = await _logAlteracaoService.GetByIdAsync(id);
            if (log == null) return NotFound();
            return Ok(log);
        }

        [HttpPost]
        public async Task<IActionResult> Add(LogAlteracao logAlteracao)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _logAlteracaoService.AddAsync(logAlteracao);
            return CreatedAtAction(nameof(GetById), new { id = logAlteracao.Id }, logAlteracao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, LogAlteracao logAlteracao)
        {
            if (id != logAlteracao.Id) return BadRequest();
            await _logAlteracaoService.UpdateAsync(logAlteracao);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _logAlteracaoService.DeleteAsync(id);
            return NoContent();
        }
    }
}
