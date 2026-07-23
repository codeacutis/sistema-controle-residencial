using SistemaControle.DTOs;
using SistemaControle.Model;

namespace SistemaControle.Interface
{
    public interface ITransacaoService
    {
        Task<TransacaoResponseDTO> SalvarTransacao(TransacaoDTO transacaoDTO);
        Task<List<TransacaoResponseDTO>> BuscarTransacoes();
        Task<TotaisResponseDTO> BuscarTotais(); 
    }
}