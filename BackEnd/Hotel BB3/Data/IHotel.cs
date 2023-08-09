using Hotel_BB3.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel_BB3.Data
{
    public interface IHotel
    {
        Task<Hotel> GetHotelByIdAsync(int id);
        Task<IEnumerable<Hotel>> GetAllHotelsAsync();
        Task<Hotel> PostHotelAsync(Hotel hotel, IFormFile hotelImage);
        Task<Hotel> PutHotelAsync(int id, Hotel hotel);
        Task<Hotel> DeleteHotelAsync(int id);
    }
}
