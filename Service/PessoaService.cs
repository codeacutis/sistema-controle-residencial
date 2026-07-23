using Microsoft.EntityFrameworkCore;
using SistemaControle.Data;
using SistemaControle.DTOs;
using SistemaControle.Interface;
using SistemaControle.Model;

namespace SistemaControle.Service
{
    public class PessoaService : IPessoaService
    {
        private readonly ConnectionContextDb _context;

        public PessoaService(ConnectionContextDb context)
        {
            _context = context;
        }

        // Busca uma pessoa pelo id diretamente no banco, retorna null se não encontrada
        public async Task<Pessoa?> BuscarPessoa(int id)
        {
            return await _context.Pessoas.FindAsync(id);
        }

        // Retorna todas as pessoas mapeadas para DTO
        public async Task<List<PessoaResponseDTO>> BuscarPessoas()
        {
            return await _context.Pessoas
                .Select(p => new PessoaResponseDTO(p.Id, p.Nome, p.Idade))
                .ToListAsync();
        }

        // Remove a pessoa e suas transações do banco via cascade delete, retorna false se não encontrada
        public async Task<bool> ExcluirPessoa(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa is not null)
            {
                _context.Pessoas.Remove(pessoa);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        // Cria uma nova pessoa no banco e retorna o DTO com o id gerado
        public async Task<PessoaResponseDTO> SalvarPessoa(PessoaDTO pessoaDTO)
        {
            var pessoa = new Pessoa(pessoaDTO.Nome, pessoaDTO.Idade);
            await _context.Pessoas.AddAsync(pessoa);
            await _context.SaveChangesAsync();
            return new PessoaResponseDTO(pessoa.Id, pessoa.Nome, pessoa.Idade);
        }
    }
}