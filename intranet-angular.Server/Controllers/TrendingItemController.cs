using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrendingItemController : ControllerBase
    {
        private readonly ITrendingItemService _service;

        public TrendingItemController(ITrendingItemService service)
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
        public async Task<IActionResult> Create(TrendingItem trendingItem)
        {
            await _service.AddAsync(trendingItem);
            return CreatedAtAction(nameof(GetById), new { id = trendingItem.Id }, trendingItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, TrendingItem trendingItem)
        {
            if (id != trendingItem.Id) return BadRequest();
            await _service.UpdateAsync(trendingItem);
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
