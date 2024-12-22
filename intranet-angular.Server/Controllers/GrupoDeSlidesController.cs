using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GrupoDeSlidesController : ControllerBase
    {
        private readonly IGrupoDeSlidesService _grupoDeSlidesService;

        public GrupoDeSlidesController(IGrupoDeSlidesService grupoDeSlidesService)
        {
            _grupoDeSlidesService = grupoDeSlidesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var grupoDeSlidess = await _grupoDeSlidesService.GetAllAsync();
            return Ok(grupoDeSlidess);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var grupoDeSlides = await _grupoDeSlidesService.GetByIdAsync(id);
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

            await _grupoDeSlidesService.AddAsync(grupoDeSlides);
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

            await _grupoDeSlidesService.UpdateAsync(grupoDeSlides);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var grupoDeSlides = await _grupoDeSlidesService.GetByIdAsync(id);
            if (grupoDeSlides == null)
            {
                return NotFound();
            }

            await _grupoDeSlidesService.DeleteAsync(id);
            return NoContent();
        }

    }
}
