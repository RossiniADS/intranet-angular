using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Model;
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
        public async Task<IActionResult> Create([FromBody] UsuarioModel usuarioModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usuario = new Usuario()
            {
                Aniversario = usuarioModel.Aniversario,
                Login = usuarioModel.Login,
                CriadoEm = new DateTime(),
                UltimaAtualizacao = new DateTime(),
                Nome = usuarioModel.Nome,
                Senha = usuarioModel.Senha,
                Email = usuarioModel.Email
            };

            var createdUsuario = await _usuarioService.CreateAsync(usuario);
            return CreatedAtAction(nameof(GetById), new { id = createdUsuario.Id }, createdUsuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UsuarioModel usuarioModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usuario = new Usuario()
            {
                Id = id,
                Aniversario = usuarioModel.Aniversario,
                Login = usuarioModel.Login,
                CriadoEm = new DateTime(),
                UltimaAtualizacao = new DateTime(),
                Nome = usuarioModel.Nome,
                Senha = usuarioModel.Senha,
                Email = usuarioModel.Email
            };

            try
            {
                var updatedUsuario = await _usuarioService.UpdateAsync(id, usuario);
                return Ok(updatedUsuario);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _usuarioService.DeleteAsync(id);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }

}
