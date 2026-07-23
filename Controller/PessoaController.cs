using Microsoft.AspNetCore.Mvc;
using SistemaControle.DTOs;
using SistemaControle.Interface;

namespace SistemaControle.Controller
{
    [Route("api/pessoa")]
    [ApiController]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoaController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [HttpPost]
        public async Task<IActionResult> SalvarPessoa([FromBody] PessoaDTO pessoaDTO)
        {
            try
            {
                var pessoa = await _pessoaService.SalvarPessoa(pessoaDTO);
                return CreatedAtAction(
                    nameof(ObterPessoa),
                    new { id = pessoa.Id }, 
                    pessoa
                );
            } catch (KeyNotFoundException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return UnprocessableEntity(new { mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirPessoa([FromRoute] int id)
        {
            var resultado = await _pessoaService.ExcluirPessoa(id);
            if(!resultado)
                return NotFound(new { mensagem = "Id não encontrado"});
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> ObterPessoas()
        {
            var pessoas = await _pessoaService.BuscarPessoas();
            if(pessoas.Count == 0)
                return NoContent();
            return Ok(pessoas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPessoa([FromRoute] int id)
        {
            try
            {
                var pessoa = await _pessoaService.BuscarPessoa(id);
                if (pessoa == null) return NotFound(new { mensagem = "Id não encontrado"});
                return Ok(pessoa);
            } catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = ex.Message});
            }
        }
    }
}