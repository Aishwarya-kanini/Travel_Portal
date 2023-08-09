
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminRegistersController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public AdminRegistersController(TourismDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminRegister>>> GetadminRegisters()
        {
            try
            {
                var adminRegisters = await _context.adminRegisters.ToListAsync();
                if (adminRegisters == null || adminRegisters.Count == 0)
                {
                    return NotFound("No admin registers found.");
                }
                return adminRegisters;
            }
#pragma warning disable
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching admin registers.");
            }
        }

        // GET: api/AdminRegisters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminRegister>> GetAdminRegister(int id)
        {
            try
            {
                var adminRegister = await _context.adminRegisters.FindAsync(id);

                if (adminRegister == null)
                {
                    return NotFound("Admin register not found.");
                }

                return adminRegister;
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching admin register.");
            }
        }

        // PUT: api/AdminRegisters/5

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminRegister(int id, AdminRegister adminRegister)
        {
            if (id != adminRegister.Admin_Id)
            {
                return BadRequest("Invalid Admin_Id.");
            }

            try
            {
                _context.Entry(adminRegister).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminRegisterExists(id))
                {
                    return NotFound("Admin register not found.");
                }
                else
                {

                    return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating admin register.");
                }
            }
        }

        // POST: api/AdminRegisters

        [HttpPost]
        public async Task<ActionResult<AdminRegister>> PostAdminRegister(AdminRegister adminRegister)
        {
            try
            {
                _context.adminRegisters.Add(adminRegister);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetAdminRegister", new { id = adminRegister.Admin_Id }, adminRegister);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating admin register.");
            }
        }

        // DELETE: api/AdminRegisters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdminRegister(int id)
        {
            try
            {
                var adminRegister = await _context.adminRegisters.FindAsync(id);
                if (adminRegister == null)
                {
                    return NotFound("Admin register not found.");
                }

                _context.adminRegisters.Remove(adminRegister);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting admin register.");
            }
        }

        private bool AdminRegisterExists(int id)
        {
            return _context.adminRegisters?.Any(e => e.Admin_Id == id) ?? false;
        }

        [HttpGet("UnapprovedTravelAgents")]
        public async Task<ActionResult<IEnumerable<AgentRegister>>> GetUnapprovedTravelAgents()
        {
            try
            {
                var unapprovedTravelAgents = await _context.agentRegisters
                    .Include(ta => ta.AdminRegister)
                    .Where(ta => ta.status == "Pending")
                    .ToListAsync();

                return unapprovedTravelAgents;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching unapproved travel agents.");
            }
        }

        // PUT: api/Administrators/UpdateApprovalStatus/{id}
        [HttpPut("UpdateApprovalStatus/{id}")]
        public async Task<IActionResult> UpdateApprovalStatus(int id, [FromBody] string approvalStatus)
        {
            try
            {
                var travelAgent = await _context.agentRegisters.FindAsync(id);
                if (travelAgent == null)
                {
                    return NotFound("Travel Agent not found");
                }

                if (approvalStatus != "Approved" && approvalStatus != "Declined")
                {
                    return BadRequest("Invalid approval status. It should be either 'Approved' or 'Declined'.");
                }

                travelAgent.status = approvalStatus;

                await _context.SaveChangesAsync();

                return Ok("Approval status updated successfully");
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating approval status.");
            }
        }
    }
}
