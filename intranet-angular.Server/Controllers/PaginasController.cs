using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaginasController : ControllerBase
    {
        private readonly IPaginaService _paginaService;

        public PaginasController(IPaginaService paginaService)
        {
            _paginaService = paginaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var paginas = await _paginaService.GetAllAsync();
            return Ok(paginas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pagina = await _paginaService.GetByIdAsync(id);
            if (pagina == null) return NotFound();

            return Ok(pagina);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Pagina pagina)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var createdPagina = await _paginaService.AddAsync(pagina);
            return CreatedAtAction(nameof(GetById), new { id = createdPagina.Id }, createdPagina);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Pagina pagina)
        {
            if (id != pagina.Id) return BadRequest("IDs não coincidem.");

            try
            {
                var updatedPagina = await _paginaService.UpdateAsync(pagina);
                return Ok(updatedPagina);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _paginaService.DeleteAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}
