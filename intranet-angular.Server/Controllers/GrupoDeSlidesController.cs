using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GrupoDeGrupoDeSlidessController : ControllerBase
    {
        private readonly IGrupoDeSlidesService _grupoDeGrupoDeSlidesService;

        public GrupoDeGrupoDeSlidessController(IGrupoDeSlidesService grupoDeGrupoDeSlidessService)
        {
            _grupoDeGrupoDeSlidesService = grupoDeGrupoDeSlidessService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var grupoDeSlidess = await _grupoDeGrupoDeSlidesService.GetAllAsync();
            return Ok(grupoDeSlidess);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var grupoDeSlides = await _grupoDeGrupoDeSlidesService.GetByIdAsync(id);
            if (grupoDeSlides == null)
            {
                return NotFound();
            }
            return Ok(grupoDeSlides);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] GrupoDeSlides grupoDeSlides)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _grupoDeGrupoDeSlidesService.AddAsync(grupoDeSlides);
            return CreatedAtAction(nameof(GetById), new { id = grupoDeSlides.Id }, grupoDeSlides);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GrupoDeSlides grupoDeSlides)
        {
            if (id != grupoDeSlides.Id)
            {
                return BadRequest("ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _grupoDeGrupoDeSlidesService.UpdateAsync(grupoDeSlides);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var grupoDeSlides = await _grupoDeGrupoDeSlidesService.GetByIdAsync(id);
            if (grupoDeSlides == null)
            {
                return NotFound();
            }

            await _grupoDeGrupoDeSlidesService.DeleteAsync(id);
            return NoContent();
        }

    }
}
