using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlideController : ControllerBase
    {
        private readonly ISlideService _service;

        public SlideController(ISlideService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var slides = await _service.GetAllAsync();
            return Ok(slides);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var slide = await _service.GetByIdAsync(id);
            if (slide == null) return NotFound();
            return Ok(slide);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Slide slide)
        {
            await _service.AddAsync(slide);
            return CreatedAtAction(nameof(GetById), new { id = slide.Id }, slide);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Slide slide)
        {
            if (id != slide.Id) return BadRequest();
            await _service.UpdateAsync(slide);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
