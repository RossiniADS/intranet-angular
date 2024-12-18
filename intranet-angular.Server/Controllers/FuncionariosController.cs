﻿using intranet_angular.Server.Entities;
using intranet_angular.Server.Interfaces;
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
        public async Task<IActionResult> Add([FromBody] Funcionario funcionario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _funcionarioService.AddAsync(funcionario);
            return CreatedAtAction(nameof(GetById), new { id = funcionario.Id }, funcionario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Funcionario funcionario)
        {
            if (id != funcionario.Id)
            {
                return BadRequest("ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _funcionarioService.UpdateAsync(funcionario);
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
    }

}