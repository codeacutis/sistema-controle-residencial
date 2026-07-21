using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaControle.Model
{
    [Table("Pessoa")]
    public class Pessoa
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id {get; set;}
        [Required]
        public string Nome {get; set;}
        [Required]
        public int Idade {get; set;}

        public Pessoa()
        {
            Nome = string.Empty;
        }

        public Pessoa(string Nome, int Idade)
        {
            this.Nome = Nome ?? throw new ArgumentNullException(nameof(Nome));
            this.Idade = Idade;
        }
    }
}