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

        public async Task<List<Transacao>> BuscarTransacoes()
        {
            return await _context.Transacoes.ToListAsync();
        }

        public async Task<Transacao> SalvarTransacao(TransacaoDTO transacaoDTO)
        {
            var pessoa = await _pessoaService.BuscarPessoa(transacaoDTO.IdPessoa);
            if (pessoa is null)
                throw new KeyNotFoundException("Pessoa não encontrada");
            
            if(pessoa.Idade < 18 && transacaoDTO.Tipo == TipoTransacao.Receita)
                throw new InvalidOperationException("Menores de 18 anos não podem cadastrar receitas");
            
            var transacao = new Transacao(transacaoDTO.Descricao, transacaoDTO.Valor, transacaoDTO.Tipo, transacaoDTO.IdPessoa);
            await _context.Transacoes.AddAsync(transacao);
            await _context.SaveChangesAsync();
            return transacao;
        }
            
    }
}