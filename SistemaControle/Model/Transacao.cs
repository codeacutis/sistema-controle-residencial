using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaControle.Model
{
    public class Transacao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id {get; set;}
        [Required]
        public string Descricao {get; set;}
        [Required]
        public decimal Valor {get; set;}
        [Required]
        public TipoTransacao Tipo {get; set;}
        [Required]
        public int IdPessoa {get; set;}
        
        [ForeignKey("IdPessoa")]
        public virtual Pessoa? Pessoa {get; set;} //permitindo valores nulos quando não carregar e fazendo lazyloading da tabela

        public Transacao()
        {
            Descricao = string.Empty;
        }

        public Transacao(string Descricao, decimal Valor, TipoTransacao Tipo, int IdPessoa)
        {
            this.Descricao = Descricao;
            this.Valor = Valor;
            this.Tipo = Tipo;
            this.IdPessoa = IdPessoa;
        }
    }
}