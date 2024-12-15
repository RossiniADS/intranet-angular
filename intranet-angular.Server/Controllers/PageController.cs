using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PageController : ControllerBase
    {
        private readonly IPageService _pageService;

        public PageController(IPageService pageService)
        {
            _pageService = pageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pages = await _pageService.GetAllAsync();
            return Ok(pages);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var page = await _pageService.GetByIdAsync(id);
            if (page == null) return NotFound();

            return Ok(page);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Page page)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var createdPage = await _pageService.CreateAsync(page);
            return CreatedAtAction(nameof(GetById), new { id = createdPage.Id }, createdPage);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Page page)
        {
            if (id != page.Id) return BadRequest("ID mismatch.");

            var updatedPage = await _pageService.UpdateAsync(page);
            return Ok(updatedPage);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _pageService.DeleteAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}
