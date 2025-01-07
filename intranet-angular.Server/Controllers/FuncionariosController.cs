using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using intranet_angular.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuncionariosController : ControllerBase
    {
        private readonly IFuncionarioService _funcionarioService;

        public FuncionariosController(IFuncionarioService funcionarioService)
        {
            _funcionarioService = funcionarioService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var funcionarios = await _funcionarioService.GetAllAsync();
            return Ok(funcionarios);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var funcionario = await _funcionarioService.GetByIdAsync(id);
            if (funcionario == null)
            {
                return NotFound();
            }
            return Ok(funcionario);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] FuncionarioRequest funcionarioRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var funcionario = await _funcionarioService.AddAsync(funcionarioRequest);
            return CreatedAtAction(nameof(GetById), new { id = funcionario.Id }, funcionario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] FuncionarioRequest funcionarioRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _funcionarioService.UpdateAsync(id, funcionarioRequest);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var funcionario = await _funcionarioService.GetByIdAsync(id);
            if (funcionario == null)
            {
                return NotFound();
            }

            await _funcionarioService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("funcionario-pagination")]
        public async Task<IActionResult> GetAllPagination(int page = 1, int pageSize = 10)
        {
            var funcionarios = await _funcionarioService.GetAllPagination(page, pageSize);
            return Ok(funcionarios);
        }
    }

}
