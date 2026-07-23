using Microsoft.AspNetCore.Mvc;
using SistemaControle.Interface;
using SistemaControle.DTOs;

namespace SistemaControle.Controller
{
    [Route("api/transacao")]
    [ApiController]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _transacaoService;

        public TransacaoController(ITransacaoService transacaoService)
        {
            _transacaoService = transacaoService;
        }

        [HttpPost]
        public async Task<IActionResult> SalvarTransacao([FromBody] TransacaoDTO transacaoDTO)
        {
            try
            {
                var transacao = await _transacaoService.SalvarTransacao(transacaoDTO);
                return CreatedAtAction(
                    nameof(BuscarTransacoes), 
                    new { id = transacao.Id }, 
                    transacao
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

        [HttpGet]
        public async Task<IActionResult> BuscarTransacoes()
        {
            var listaTransacao = await _transacaoService.BuscarTransacoes();
            if (listaTransacao.Count == 0)
                return NoContent();
            return Ok(listaTransacao);
        }

        [HttpGet("totais")]
        public async Task<IActionResult> BuscarTotais()
        {
            var total = await _transacaoService.BuscarTotais();
            return Ok(total);
        }


    }
}