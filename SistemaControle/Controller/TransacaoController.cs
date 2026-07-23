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

        // Recebe os dados via corpo da requisição, salva a transação e retorna os erros correspondentes
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

        // Retorna a lista de todas as transações cadastradas ou 204 se não houver nenhuma
        [HttpGet]
        public async Task<IActionResult> BuscarTransacoes()
        {
            var listaTransacao = await _transacaoService.BuscarTransacoes();
            if (listaTransacao.Count == 0)
                return NoContent();
            return Ok(listaTransacao);
        }

        // Retorna os totais consolidados de receitas, despesas e saldo por pessoa e o total geral
        [HttpGet("totais")]
        public async Task<IActionResult> BuscarTotais()
        {
            var total = await _transacaoService.BuscarTotais();
            return Ok(total);
        }


    }
}