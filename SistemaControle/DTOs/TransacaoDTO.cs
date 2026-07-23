using SistemaControle.Model;

namespace SistemaControle.DTOs
{
    public record TransacaoDTO(string Descricao, decimal Valor, TipoTransacao Tipo, int IdPessoa);                         
}