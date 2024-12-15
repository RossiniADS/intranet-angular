using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Videoontroller : ControllerBase
    {
        private readonly IVideoService _service;

        public Videoontroller(IVideoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var videos = await _service.GetAllAsync();
            return Ok(videos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var video = await _service.GetByIdAsync(id);
            if (video == null) return NotFound();
            return Ok(video);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Video video)
        {
            await _service.AddAsync(video);
            return CreatedAtAction(nameof(GetById), new { id = video.Id }, video);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Video video)
        {
            if (id != video.Id) return BadRequest();
            await _service.UpdateAsync(video);
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
