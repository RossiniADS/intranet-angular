using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
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
            if (pagina == null)
            {
                return NotFound();
            }
            return Ok(pagina);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] PaginaRequest paginaRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pagina = await _paginaService.AddAsync(paginaRequest);
            return CreatedAtAction(nameof(GetById), new { id = pagina.Id }, pagina);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PaginaRequest paginaRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pagina = await _paginaService.UpdateAsync(id, paginaRequest);
            return Ok(pagina);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pagina = await _paginaService.GetByIdAsync(id);
            if (pagina == null)
            {
                return NotFound();
            }

            await _paginaService.DeleteAsync(id);
            return NoContent();
        }
    }
}
