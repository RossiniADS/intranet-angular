using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TabController : ControllerBase
    {
        private readonly ITabService _service;

        public TabController(ITabService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tabs = await _service.GetAllAsync();
            return Ok(tabs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var tab = await _service.GetByIdAsync(id);
            if (tab == null) return NotFound();
            return Ok(tab);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Tab tab)
        {
            await _service.AddAsync(tab);
            return CreatedAtAction(nameof(GetById), new { id = tab.Id }, tab);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Tab tab)
        {
            if (id != tab.Id) return BadRequest();
            await _service.UpdateAsync(tab);
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
