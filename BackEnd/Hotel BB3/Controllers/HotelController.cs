using Hotel_BB3.Data;
using Hotel_BB3.Model;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_BB3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotel hotelRepository;
        private readonly ILogger<HotelController> logger;
        private readonly IWebHostEnvironment hostEnvironment;

        public HotelController(IHotel hotelRepository, ILogger<HotelController> logger, IWebHostEnvironment hostEnvironment)
        {
            this.hotelRepository = hotelRepository;
            this.logger = logger;
            this.hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetAllHotels()
        {
            try
            {
                var hotels = await hotelRepository.GetAllHotelsAsync();
                return Ok(hotels);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while fetching hotels.");
                return StatusCode(500, "An error occurred while fetching hotels.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotelById(int id)
        {
            try
            {
                var hotel = await hotelRepository.GetHotelByIdAsync(id);
                if (hotel == null)
                {
                    return NotFound();
                }
                return Ok(hotel);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"An error occurred while fetching the hotel with ID: {id}");
                return StatusCode(500, $"An error occurred while fetching the hotel with ID: {id}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostHotel([FromForm] Hotel hotel, IFormFile hotelImage)
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
                var addedHotel = await hotelRepository.PostHotelAsync(hotel, hotelImage);
                return CreatedAtAction(nameof(GetHotelById), new { id = addedHotel.Id }, addedHotel);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while adding the hotel.");
                return StatusCode(500, "An error occurred while adding the hotel.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotel(int id, [FromForm] Hotel hotel, IFormFile hotelImage)
        {
            if (id != hotel.Id)
            {
                return BadRequest();
            }

            if (hotelImage != null && hotelImage.Length > 0)
            {
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
                var updatedHotel = await hotelRepository.PutHotelAsync(id, hotel);
                if (updatedHotel == null)
                {
                    return NotFound();
                }
                return Ok(updatedHotel);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"An error occurred while updating the hotel with ID: {id}");
                return StatusCode(500, $"An error occurred while updating the hotel with ID: {id}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            try
            {
                var deletedHotel = await hotelRepository.DeleteHotelAsync(id);
                if (deletedHotel == null)
                {
                    return NotFound();
                }
                return Ok(deletedHotel);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"An error occurred while deleting the hotel with ID: {id}");
                return StatusCode(500, $"An error occurred while deleting the hotel with ID: {id}");
            }
        }
    }
}
