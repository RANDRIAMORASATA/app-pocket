using Microsoft.AspNetCore.Mvc;
using pocketApi.Models; // ← pour Pocket
using pocketApi.Data;   // ← pour PocketContext
using System.Collections.Generic;
using System.Linq;

namespace pocketApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PocketController : ControllerBase
    {
        private readonly PocketContext _context;

        public PocketController(PocketContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Pocket>> Get()
        {
            return _context.Pockets.ToList();
        }

        [HttpPost]
        public ActionResult<Pocket> Post(Pocket pocket)
        {
            _context.Pockets.Add(pocket);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = pocket.Id }, pocket);
        }
    }
}
