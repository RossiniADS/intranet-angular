using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoticiasController : ControllerBase
    {
        private readonly INoticiaService _noticiaService;

        public NoticiasController(INoticiaService noticiaService)
        {
            _noticiaService = noticiaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var noticias = await _noticiaService.GetAllAsync();
            return Ok(noticias);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var noticia = await _noticiaService.GetByIdAsync(id);
            if (noticia == null)
            {
                return NotFound();
            }
            return Ok(noticia);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Noticia noticia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdNoticia = await _noticiaService.AddAsync(noticia);
            return CreatedAtAction(nameof(GetById), new { id = createdNoticia.Id }, createdNoticia);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Noticia noticia)
        {
            if (id != noticia.Id)
            {
                return BadRequest("ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedNoticia = await _noticiaService.UpdateAsync(noticia);
            return Ok(updatedNoticia);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _noticiaService.DeleteAsync(id);
            return NoContent();
        }
    }

}
