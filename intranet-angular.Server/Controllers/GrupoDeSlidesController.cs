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

        [HttpGet("page/{pageId}")]
        public async Task<IActionResult> GetByPageId(int pageId)
        {
            var grupoDeSlides = await _grupoDeSlidesService.GetByPageIdAsync(pageId);
            if (grupoDeSlides == null)
            {
                return NotFound();
            }
            return Ok(grupoDeSlides);
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Add([FromForm] GrupoSlideRequest grupoDeSlidesRequest)
        {
            if (grupoDeSlidesRequest == null)
            {
                return BadRequest("Nenhum dado foi enviado.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupoDeSlides = await _grupoDeSlidesService.AddAsync(grupoDeSlidesRequest.Grupos);
            return Ok(grupoDeSlides);
        }

        [HttpPut("{id}")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Update(int id, [FromForm] GrupoSlideRequest grupoDeSlidesRequest)
        {
            if (grupoDeSlidesRequest == null)
            {
                return BadRequest("Nenhum dado foi enviado.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _grupoDeSlidesService.UpdateAsync(id, grupoDeSlidesRequest.Grupos.First());
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
