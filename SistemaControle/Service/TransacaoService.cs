using SistemaControle.Data;
using SistemaControle.Model;
using SistemaControle.Interface;
using SistemaControle.DTOs;
using Microsoft.EntityFrameworkCore;

namespace SistemaControle.Service
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ConnectionContextDb _context;
        private readonly IPessoaService _pessoaService;

        public TransacaoService(ConnectionContextDb context, IPessoaService pessoaService)
        {
            _context = context;
            _pessoaService = pessoaService;
        }

        // Carrega todas as pessoas com suas transações e calcula receitas, despesas e saldo de cada uma
        public async Task<TotaisResponseDTO> BuscarTotais()
        {
            var pessoas = await _context.Pessoas.Include(p => p.Transacoes).ToListAsync();
            var totalPorPessoa = pessoas.Select(p => new TotalPessoaDTO
            (
                p.Id,
                p.Nome,
                p.Idade,
                TotalReceitas: p.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor),
                TotalDespesas: p.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor),
                Saldo: p.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor) - 
                    p.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor)
            )).ToList();
            return new TotaisResponseDTO(
                Pessoas: totalPorPessoa,
                TotalGeralReceitas: totalPorPessoa.Sum(p => p.TotalReceitas),
                TotalGeralDespesas: totalPorPessoa.Sum(p => p.TotalDespesas),
                SaldoLiquido: totalPorPessoa.Sum(p => p.Saldo)
            );
        }

        // Retorna todas as transações, mapeadas para DTO
        public async Task<List<TransacaoResponseDTO>> BuscarTransacoes()
        {
            return await _context.Transacoes
                .Select(t => new TransacaoResponseDTO(t.Id, t.Descricao, t.Valor, t.Tipo, t.IdPessoa))
                .ToListAsync();
        }

        // Valida se a pessoa existe e se menor de idade não está cadastrando receita, depois persiste a transação
        public async Task<TransacaoResponseDTO> SalvarTransacao(TransacaoDTO transacaoDTO)
        {
            var pessoa = await _pessoaService.BuscarPessoa(transacaoDTO.IdPessoa);
            if (pessoa is null)
                throw new KeyNotFoundException("Pessoa não encontrada");
            
            if(pessoa.Idade < 18 && transacaoDTO.Tipo == TipoTransacao.Receita)
                throw new InvalidOperationException("Menores de 18 anos não podem cadastrar receitas");
            
            var transacao = new Transacao(transacaoDTO.Descricao, transacaoDTO.Valor, transacaoDTO.Tipo, transacaoDTO.IdPessoa);
            await _context.Transacoes.AddAsync(transacao);
            await _context.SaveChangesAsync();
            return new TransacaoResponseDTO(transacao.Id, transacao.Descricao, transacao.Valor, transacao.Tipo, transacao.IdPessoa);
        }
            
    }
}