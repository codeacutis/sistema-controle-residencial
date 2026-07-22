using Microsoft.EntityFrameworkCore;
using SistemaControle.Model;

namespace SistemaControle.Data
{
    public class ConnectionContextDb : DbContext
    {
        public ConnectionContextDb(DbContextOptions<ConnectionContextDb> options)
            : base(options) { }

        
        public DbSet<Pessoa> Pessoas => Set<Pessoa>();

        public DbSet<Transacao> Transacoes => Set<Transacao>();

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