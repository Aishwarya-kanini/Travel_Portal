using Hotel_BB3.Model;
using Microsoft.EntityFrameworkCore;

namespace Hotel_BB3.Data
{
    public class HotelRepository : IHotel
    {
        private readonly HotelContext context;
        private readonly IWebHostEnvironment hostEnvironment;

        public HotelRepository(HotelContext context, IWebHostEnvironment hostEnvironment)
        {
            this.context = context;
            this.hostEnvironment = hostEnvironment;
        }

        public async Task<Hotel> GetHotelByIdAsync(int id)
        {
            try
            {
                return await context.hotels.FirstOrDefaultAsync(x => x.Id == id);
            }
            catch (Exception ex)
            {
                // Handle and log the exception here if needed
                throw;
            }
        }

        public async Task<IEnumerable<Hotel>> GetAllHotelsAsync()
        {
            try
            {
                return await context.hotels.ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle and log the exception here if needed
                throw;
            }
        }

        public async Task<Hotel> PostHotelAsync(Hotel hotel, IFormFile hotelImage)
        {
            if (hotelImage != null && hotelImage.Length > 0)
            {
                // Handle the image upload and save it to a directory
                var uploadsFolder = Path.Combine(hostEnvironment.ContentRootPath, "wwwroot", "uploads", "hotels");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(hotelImage.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await hotelImage.CopyToAsync(stream);
                }

                hotel.Hotelimage = fileName;
            }

            try
            {
                context.hotels.Add(hotel);
                await context.SaveChangesAsync();
                return hotel;
            }
            catch (Exception ex)
            {
                // Handle and log the exception here if needed
                throw;
            }
        }
    

    public async Task<Hotel> PutHotelAsync(int id, Hotel hotel)
        {
            try
            {
                var existingHotel = await context.hotels.FindAsync(id);
                if (existingHotel == null)
                {
                    return null; // Hotel with the given ID not found
                }

                existingHotel.Name = hotel.Name;
                existingHotel.Address = hotel.Address;
                existingHotel.City = hotel.City;
                existingHotel.Ratings = hotel.Ratings;
                existingHotel.Hotelimage = hotel.Hotelimage;

                await context.SaveChangesAsync();
                return existingHotel;
            }
            catch (Exception ex)
            {
                // Handle and log the exception here if needed
                throw;
            }
        }

        public async Task<Hotel> DeleteHotelAsync(int id)
        {
            try
            {
                Hotel hotel = await context.hotels.FindAsync(id);
                if (hotel != null)
                {
                    context.hotels.Remove(hotel);
                    await context.SaveChangesAsync();
                }
                return hotel;
            }
            catch (Exception ex)
            {
                // Handle and log the exception here if needed
                throw;
            }
        }

       
    }
}
