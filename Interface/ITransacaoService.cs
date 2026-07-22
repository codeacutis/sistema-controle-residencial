using SistemaControle.DTOs;
using SistemaControle.Model;

namespace SistemaControle.Interface
{
    public interface ITransacaoService
    {
        Task<Transacao> SalvarTransacao(TransacaoDTO transacaoDTO);
        Task<List<Transacao>> BuscarTransacoes();
        Task<TotaisResponseDTO> BuscarTotais(); 
    }
}