using SistemaControle.Model;

namespace SistemaControle.DTOs
{
    public record TotaisResponseDTO(List<TotalPessoaDTO> Pessoas, decimal TotalGeralReceitas, decimal TotalGeralDespesas, decimal SaldoLiquido);
}