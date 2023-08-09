using Hotel_BB3.Model;
using Microsoft.EntityFrameworkCore;

namespace Hotel_BB3.Data
{
    public class HotelContext : DbContext
    {
        public HotelContext(DbContextOptions<HotelContext> options) : base(options)
        {
        }
        public DbSet<Hotel> hotels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
         
        }
    }
}
