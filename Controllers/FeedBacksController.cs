using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.AspNetCore.Authorization;

namespace Big_Bang3_Assessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBacksController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public FeedBacksController(TourismDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedBack>>> GetfeedBacks()
        {
            try
            {
                var feedbacks = await _context.feedBacks.ToListAsync();
                return feedbacks;
            }
#pragma warning disable
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching feedbacks.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FeedBack>> GetFeedBack(int id)
        {
            try
            {
                var feedBack = await _context.feedBacks.FindAsync(id);
                if (feedBack == null)
                {
                    return NotFound("Feedback not found.");
                }

                return feedBack;
            }
#pragma warning disable
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching feedback.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedBack(int id, FeedBack feedBack)
        {
            if (id != feedBack.FeedBack_id)
            {
                return BadRequest("Invalid FeedBack_id.");
            }

            try
            {
                _context.Entry(feedBack).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedBackExists(id))
                {
                    return NotFound("Feedback not found.");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating feedback.");
                }
            }
        }

        [HttpPost]
        public async Task<ActionResult<FeedBack>> PostFeedBack(FeedBack feedBack)
        {
            try
            {
                var user = await _context.users.FindAsync(feedBack.user.User_Id);
                if (user == null)
                {
                    return BadRequest("Invalid user ID");
                }
                feedBack.user = user;

                _context.feedBacks.Add(feedBack);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFeedBack", new { id = feedBack.FeedBack_id }, feedBack);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating feedback.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedBack(int id)
        {
            try
            {
                var feedBack = await _context.feedBacks.FindAsync(id);
                if (feedBack == null)
                {
                    return NotFound("Feedback not found.");
                }

                _context.feedBacks.Remove(feedBack);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting feedback.");
            }
        }

        private bool FeedBackExists(int id)
        {
            return _context.feedBacks.Any(e => e.FeedBack_id == id);
        }
    }
}
