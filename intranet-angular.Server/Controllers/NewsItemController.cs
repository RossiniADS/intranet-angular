using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsItemController : ControllerBase
    {
        private readonly INewsItemService _service;

        public NewsItemController(INewsItemService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create(NewsItem newsItem)
        {
            await _service.AddAsync(newsItem);
            return CreatedAtAction(nameof(GetById), new { id = newsItem.Id }, newsItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, NewsItem newsItem)
        {
            if (id != newsItem.Id) return BadRequest();
            await _service.UpdateAsync(newsItem);
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
