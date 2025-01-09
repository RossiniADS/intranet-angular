using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Request;
using Microsoft.AspNetCore.Mvc;

namespace intranet_angular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var usuarios = await _usuarioService.GetAllAsync();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var usuario = await _usuarioService.GetByIdAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UsuarioRequest usuarioRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdUsuario = await _usuarioService.CreateAsync(usuarioRequest);
            return CreatedAtAction(nameof(GetById), new { id = createdUsuario.Id }, createdUsuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UsuarioRequest usuarioRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedUsuario = await _usuarioService.UpdateAsync(id, usuarioRequest);
            return Ok(updatedUsuario);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _usuarioService.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _usuarioService.Authenticate(request.Login, request.Senha);

            if (token == null)
                return Unauthorized(new { message = "Credenciais inválidas" });

            return Ok(new { token });
        }
    }

}
