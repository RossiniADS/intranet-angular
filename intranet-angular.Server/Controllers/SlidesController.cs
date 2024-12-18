using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlidesController : ControllerBase
    {
        private readonly ISlideService _slideService;

        public SlidesController(ISlideService slideService)
        {
            _slideService = slideService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var slides = await _slideService.GetAllAsync();
            return Ok(slides);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var slide = await _slideService.GetByIdAsync(id);
            if (slide == null)
            {
                return NotFound();
            }
            return Ok(slide);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Slide slide)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _slideService.AddAsync(slide);
            return CreatedAtAction(nameof(GetById), new { id = slide.Id }, slide);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Slide slide)
        {
            if (id != slide.Id)
            {
                return BadRequest("ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _slideService.UpdateAsync(slide);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var slide = await _slideService.GetByIdAsync(id);
            if (slide == null)
            {
                return NotFound();
            }

            await _slideService.DeleteAsync(id);
            return NoContent();
        }
    }

}
