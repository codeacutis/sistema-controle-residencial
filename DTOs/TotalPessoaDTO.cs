namespace SistemaControle.DTOs
{
    public record TotalPessoaDTO(int Id, string Nome, int Idade, decimal TotalReceitas, decimal TotalDespesas, decimal Saldo);
}