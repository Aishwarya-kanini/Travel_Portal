using System.ComponentModel.DataAnnotations;

namespace Bb3Gallery.Models
{
    public class PhotoGallery
    {
        [Key] public int Photo_Id { get; set; }
        public string? TourGallery { get; set; }
    }

   
}
