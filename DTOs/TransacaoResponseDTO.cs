using SistemaControle.Model;

namespace SistemaControle.DTOs
{
    public record TransacaoResponseDTO(int Id, string Descricao, decimal Valor, TipoTransacao Tipo, int IdPessoa);

}