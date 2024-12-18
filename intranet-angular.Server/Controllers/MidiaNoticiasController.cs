using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MidiaNoticiasController : ControllerBase
    {
        private readonly IMidiaNoticiaService _midiaNoticiaService;

        public MidiaNoticiasController(IMidiaNoticiaService midiaNoticiaService)
        {
            _midiaNoticiaService = midiaNoticiaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var midiaNoticias = await _midiaNoticiaService.GetAllAsync();
            return Ok(midiaNoticias);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var midiaNoticia = await _midiaNoticiaService.GetByIdAsync(id);
            if (midiaNoticia == null)
            {
                return NotFound();
            }
            return Ok(midiaNoticia);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] MidiaNoticia midiaNoticia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdMidiaNoticia = await _midiaNoticiaService.AddAsync(midiaNoticia);
            return CreatedAtAction(nameof(GetById), new { id = createdMidiaNoticia.Id }, createdMidiaNoticia);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] MidiaNoticia midiaNoticia)
        {
            if (id != midiaNoticia.Id)
            {
                return BadRequest("ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedMidiaNoticia = await _midiaNoticiaService.UpdateAsync(midiaNoticia);
            return Ok(updatedMidiaNoticia);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _midiaNoticiaService.DeleteAsync(id);
            return NoContent();
        }
    }
}
