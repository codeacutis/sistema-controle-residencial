using SistemaControle.DTOs;
using SistemaControle.Model;

namespace SistemaControle.Interface
{
    public interface IPessoaService
    {
        Task<PessoaResponseDTO> SalvarPessoa(PessoaDTO pessoaDTO);
        Task<bool> ExcluirPessoa(int id);
        Task<Pessoa?> BuscarPessoa(int id);
        Task<List<PessoaResponseDTO>> BuscarPessoas(); 
    }
}