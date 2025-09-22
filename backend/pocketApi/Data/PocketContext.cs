using Microsoft.EntityFrameworkCore;
using pocketApi.Models;

namespace pocketApi.Data
{
    public class PocketContext : DbContext  // <- le nom de la classe et du constructeur doivent correspondre
    {
        public PocketContext(DbContextOptions<PocketContext> options) 
            : base(options)
        {
        }

        public DbSet<Pocket> Pockets { get; set; }
    }
}
