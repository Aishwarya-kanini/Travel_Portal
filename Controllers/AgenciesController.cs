using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.AspNetCore.Authorization;

namespace Big_Bang3_Assessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgencyController : ControllerBase
    {
        private readonly TourismDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AgencyController(TourismDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [Authorize(Roles = "Agent,User")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agency>>> GetAgencies()
        {
            try
            {
                return await _context.agencies
                    .Include(a => a.agentRegister)
                    .Include(a => a.bookings)
                    .Include(a => a.accommodationDetails)
                    .ToListAsync();
            }
#pragma warning disable
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching agencies.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Agency>> GetAgency(int id)
        {
            try
            {
                var agency = await _context.agencies
                    .Include(a => a.agentRegister)
                    .Include(a => a.bookings)
                    .Include(a => a.accommodationDetails)
                    .FirstOrDefaultAsync(a => a.Agency_Id == id);

                if (agency == null)
                {
                    return NotFound("Agency not found.");
                }

                return agency;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching agency.");
            }
        }

        [Authorize(Roles = "Agent")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgency(int id, [FromForm] Agency agency, IFormFile tourImagePath)
        {
            if (id != agency.Agency_Id)
            {
                return BadRequest("Invalid Agency_Id.");
            }

            try
            {
                if (tourImagePath != null && tourImagePath.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads/images");
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(tourImagePath.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await tourImagePath.CopyToAsync(stream);
                    }

                    agency.TourImagePath = fileName;
                }

                _context.Entry(agency).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgencyExists(id))
                {
                    return NotFound("Agency not found.");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating agency.");
                }
            }
        }

        [Authorize(Roles = "Agent")]
        [HttpPost]
        public async Task<ActionResult<Agency>> CreateAgency([FromForm] Agency agency, IFormFile imageFile)
        {
            try
            {
                if (imageFile != null && imageFile.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads/images");
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(stream);
                    }

                    agency.TourImagePath = fileName;
                }

                if (agency.agentRegister != null)
                {
                    var r = _context.agentRegisters.Find(agency.agentRegister.Agent_Id);
                    if (r != null)
                    {
                        agency.agentRegister = r;
                    }
                }

                _context.agencies.Add(agency);
                await _context.SaveChangesAsync();

                return agency;
            }
#pragma warning disable
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating agency.");
            }
        }

        [Authorize(Roles = "Users")]
        [HttpGet("filterByRating/{rating}")]
        public async Task<ActionResult<IEnumerable<Agency>>> FilterAgenciesByRating(string rating)
        {
            try
            {
                var filteredAgencies = await _context.agencies
                    .Include(a => a.agentRegister)
                    .Include(a => a.bookings)
                    .Include(a => a.accommodationDetails)
                    .Where(a => a.Agency_Rating == rating)
                    .ToListAsync();

                return filteredAgencies;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while filtering agencies by rating.");
            }
        }

        [Authorize(Roles = "Users")]
        [HttpGet("filterByRatePerDay/{ratePerDay}")]
        public async Task<ActionResult<IEnumerable<Agency>>> FilterAgenciesByRatePerDay(int ratePerDay)
        {
            try
            {
                var filteredAgencies = await _context.agencies
                    .Include(a => a.agentRegister)
                    .Include(a => a.bookings)
                    .Include(a => a.accommodationDetails)
                    .Where(a => a.rate_for_day == ratePerDay)
                    .ToListAsync();

                return filteredAgencies;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while filtering agencies by rate per day.");
            }
        }

        [Authorize(Roles = "Agent")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgency(int id)
        {
            try
            {
                var agency = await _context.agencies.FindAsync(id);
                if (agency == null)
                {
                    return NotFound("Agency not found.");
                }

                _context.agencies.Remove(agency);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting agency.");
            }
        }

        private bool AgencyExists(int id)
        {
            return _context.agencies.Any(a => a.Agency_Id == id);
        }
    }
}
