using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardapiosController : ControllerBase
    {
        private readonly ICardapioService _cardapioService;

        public CardapiosController(ICardapioService cardapioService)
        {
            _cardapioService = cardapioService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cardapios = await _cardapioService.GetAllAsync();
            return Ok(cardapios);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cardapio = await _cardapioService.GetByIdAsync(id);
            if (cardapio == null)
            {
                return NotFound();
            }
            return Ok(cardapio);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] CardapioRequest cardapioRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdCardapio = await _cardapioService.AddAsync(cardapioRequest);
            return CreatedAtAction(nameof(GetById), new { id = createdCardapio.Id }, createdCardapio);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] CardapioRequest cardapioRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedCardapio = await _cardapioService.UpdateAsync(id, cardapioRequest);
            return Ok(updatedCardapio);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _cardapioService.DeleteAsync(id);
            return NoContent();
        }
    }
}
