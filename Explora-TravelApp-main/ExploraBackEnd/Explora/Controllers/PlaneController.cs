using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Explora.dto;

using System.Collections;
using System.Xml.Linq;
using Explora.data;
using Explora.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Explora.dto.FindDto;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaneController : Controller
    {
        private ExploraContext context;
        public PlaneController (ExploraContext context)
        {
            this.context = context;
        }
        // GET: api/values
        [HttpPost("Create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreatePlane(CreatePlaneDto inputData)
        {
            var airline = context.TAirlines.FirstOrDefault(n => n.IdAirline == inputData.IdAirline);
            if (airline == null || airline.IsDelete != 0)
            {
                return NotFound();
            }
            context.TPlanes.Add(new TPlane
            {
                
                PlaneName = inputData.PlaneName,
                IdAirline = inputData.IdAirline,
                StartPoint = inputData.StartPoint,
                EndPoint = inputData.EndPoint,
                StartTime = inputData.StartTime,
                Price = inputData.Price,
                Slot = inputData.Slot,
                EmptySlot = inputData.Slot,
                IsDelete=0
            });;
            try
            {
                context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return BadRequest(new {message = "Không tồn tại hãng hàng không" });
            }
            
            return Ok();
            }
        [HttpGet("Get-all")]
        public IActionResult GetAllPlane()
        {
            var plane = context.TPlanes.Where(p => p.IsDelete == 0).Include(p => p.IdAirlineNavigation).Select(p => new PlaneDto
            {
                IdPlane = p.IdPlane,
                IdAirline =p.IdAirline,
                PlaneName = p.PlaneName,
                StartPoint = p.StartPoint,
                EndPoint = p.EndPoint,
                StartTime = p.StartTime,
                Price = p.Price,
                Slot = p.Slot,
                EmptySlot = p.EmptySlot,
                IdAirlineNavigation =p.IdAirlineNavigation
            }) ;
            return Ok(plane);
        }
        [HttpGet("Get-by-id/{id}")]
        public IActionResult GetPlaneById(int id)
        {
            var plane = context.TPlanes.Include(p => p.IdAirlineNavigation).FirstOrDefault(p => p.IdPlane == id);
            if (plane == null || plane.IsDelete != 0)
            {
                return NotFound();
            }
            return Ok(new { plane });
        }
        [HttpGet("Get-by-keyword")]
        public IActionResult GetPlaneByKeyword([FromQuery] FindDto inputData)
        {
            var from = inputData.StartTime;
            var to = from.AddDays(1);
            var now = DateTime.Now;
            var query = context.TPlanes.Where(p => p.StartPoint == inputData.StartPoint
                        && p.EndPoint == inputData.EndPoint && (p.StartTime >= from && p.StartTime <= to && p.StartTime > now)).
                        Include(p => p.IdAirlineNavigation).Select(p => new PlaneDto
                        {
                            IdPlane = p.IdPlane,
                            IdAirline = p.IdAirline,
                            PlaneName = p.PlaneName,
                            StartPoint = p.StartPoint,
                            EndPoint = p.EndPoint,
                            StartTime = p.StartTime,
                            Price = p.Price,
                            Slot = p.Slot,
                            EmptySlot = p.EmptySlot,
                            IdAirlineNavigation = p.IdAirlineNavigation
                        });
            var result = query.ToList();
            return Ok(new { result });

        }
        [HttpPut("Update/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateById(int id, UpdatePlaneDto dataUpdate)
        {
            var plane = context.TPlanes.FirstOrDefault(p => p.IdPlane == id);
            if (plane == null || plane.IsDelete != 0)
            {
                return NotFound();
            }
            plane.StartTime  = dataUpdate.StartTime;
            plane.Price = dataUpdate.Price;
            context.SaveChanges();
            return Ok(new { plane });
        }
        [HttpDelete("Delete/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteById(int id)
        {
            var plane = context.TPlanes.FirstOrDefault(p => p.IdPlane == id);
            if (plane == null || plane.IsDelete != 0)
            {
                return NotFound();
            }
            plane.IsDelete = 1;
            context.SaveChanges();
            return Ok();
        }
    }
}
