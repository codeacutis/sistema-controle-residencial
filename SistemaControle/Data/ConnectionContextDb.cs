using Microsoft.EntityFrameworkCore;
using SistemaControle.Model;

namespace SistemaControle.Data
{
    public class ConnectionContextDb : DbContext // Contexto do Entity Framework que representa a conexão com o banco de dados SQLite
    {
        public ConnectionContextDb(DbContextOptions<ConnectionContextDb> options)
            : base(options) { }

        // Tabela de pessoas no banco de dados
        public DbSet<Pessoa> Pessoas => Set<Pessoa>();

        // Tabela de transações no banco de dados
        public DbSet<Transacao> Transacoes => Set<Transacao>();

        // Configura o relacionamento entre Transacao e Pessoa com deleção em cascata
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Transacao>()
                .HasOne(p => p.Pessoa)
                .WithMany(b => b.Transacoes)
                .HasForeignKey(p => p.IdPessoa)
                .OnDelete(DeleteBehavior.Cascade); // Ativa o cascade delete
        }
    }
}