using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentRegistersController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public AgentRegistersController(TourismDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AgentRegister>>> GetAgentRegisters()
        {
            try
            {
                var agentRegisters = await _context.agentRegisters.ToListAsync();
                if (agentRegisters == null || agentRegisters.Count == 0)
                {
                    return NotFound("No agent registers found.");
                }

                return agentRegisters;
            }
#pragma warning disable
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching agent registers.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AgentRegister>> GetAgentRegister(int id)
        {
            try
            {
                var agentRegister = await _context.agentRegisters.FindAsync(id);
                if (agentRegister == null)
                {
                    return NotFound("Agent register not found.");
                }

                return agentRegister;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching agent register.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgentRegister(int id, AgentRegister agentRegister)
        {
            if (id != agentRegister.Agent_Id)
            {
                return BadRequest("Invalid Agent_Id.");
            }

            try
            {
                _context.Entry(agentRegister).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgentRegisterExists(id))
                {
                    return NotFound("Agent register not found.");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating agent register.");
                }
            }
        }

        [HttpPost]
        public async Task<ActionResult<AgentRegister>> PostAgentRegister(AgentRegister agentRegister)
        {
            try
            {
                if (_context.agentRegisters == null)
                {
                    return Problem("Entity set 'TourismDbContext.agentRegisters' is null.");
                }

                _context.agentRegisters.Add(agentRegister);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAgentRegister", new { id = agentRegister.Agent_Id }, agentRegister);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating agent register.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgentRegister(int id)
        {
            try
            {
                var agentRegister = await _context.agentRegisters.FindAsync(id);
                if (agentRegister == null)
                {
                    return NotFound("Agent register not found.");
                }

                _context.agentRegisters.Remove(agentRegister);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting agent register.");
            }
        }

        [HttpGet("Approved")]
        public async Task<ActionResult<IEnumerable<AgentRegister>>> GetApprovedTravelAgents()
        {
            try
            {
                var approvedTravelAgents = await _context.agentRegisters
                    .Include(ta => ta.AdminRegister)
                    .Where(ta => ta.status == "Approved")
                    .ToListAsync();

                return approvedTravelAgents;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching approved travel agents.");
            }
        }

        private bool AgentRegisterExists(int id)
        {
            return (_context.agentRegisters?.Any(e => e.Agent_Id == id)).GetValueOrDefault();
        }
    }
}
