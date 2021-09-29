using Microsoft.EntityFrameworkCore;
using Tiga.Models;

namespace Tiga
{
    public class TigaDbContext : DbContext
    {

        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }

        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<Model> Models { get; set; }

        public TigaDbContext(DbContextOptions<TigaDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => new { vf.VehicleId, vf.FeatureId });
        }

    }
}