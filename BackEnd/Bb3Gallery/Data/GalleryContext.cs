using Bb3Gallery.Models;
using Big_Bang3_Assessment.Data;
using Microsoft.EntityFrameworkCore;

namespace Bb3Gallery.Data
{
    public class GalleryContext:DbContext
    {
        public GalleryContext(DbContextOptions<GalleryContext> options) : base(options)
        {
        }
        public DbSet<PhotoGallery> photos { get; set; }
    }
}
