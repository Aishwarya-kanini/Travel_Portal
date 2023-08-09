using Big_Bang3_Assessment.Model;
using Microsoft.EntityFrameworkCore;

namespace Big_Bang3_Assessment.Data
{
    public class TourismDbContext : DbContext
    {
        public TourismDbContext(DbContextOptions<TourismDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entity relationships or other customizations here
        }
        public DbSet<AdminRegister> adminRegisters { get; set; }

        public DbSet<AgentRegister> agentRegisters { get; set; }

        public DbSet<User> users { get; set; }

        public DbSet<Agency> agencies { get; set; }

        public DbSet<AccommodationDetail> accommodations { get; set;}

        public DbSet<Booking> Booking { get; set; }

        public DbSet<FeedBack> feedBacks { get; set; }


    }
}
