using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Explora.dto;
using Explora.data;
using Explora.Entity;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Numerics;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderRoomController : ControllerBase
    {
        private ExploraContext context;
        public OrderRoomController(ExploraContext context)
        {
            this.context = context;
        }
        // GET: api/values
        [HttpPost("CreateBillRoom")]
        [Authorize]
        public IActionResult CreateOrder([FromBody] CreateBillRoomDto dataInput)
        {
            var room = context.TRooms.Include(r => r.TBillRooms)
                .Where(h => !h.TBillRooms.Any(r => r.StartTime <= dataInput.EndTime && r.EndTime >= dataInput.StartTime))
                .Where(h => h.RoomTypeId == dataInput.RoomTypeId).Take(dataInput.Amount).ToList();

            if (room.Count < dataInput.Amount)
            {
                return BadRequest(new { message = "Hết phòng" });
            }
            
            var roomtype = context.TRoomTypes.FirstOrDefault(rt => rt.RoomTypeId == dataInput.RoomTypeId);
            var order = context.TBillRooms.Add(new TBillRoom
            {
                GuessName = dataInput.GuessName,
                GuessEmail = dataInput.GuessEmail,
                PhoneNumber = dataInput.PhoneNumber,
                StartTime = dataInput.StartTime,
                EndTime = dataInput.EndTime,
                Amount = dataInput.Amount,
                TotalPrice = roomtype.Price * (int)((dataInput.EndTime - dataInput.StartTime).TotalDays)*dataInput.Amount,
                BuyTime = DateTime.Now.Date,
                HotelId = dataInput.IdHotel,
                UserId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0"),
                TRooms = room
            });
            
            context.SaveChanges();
            return Ok();
        }
        [HttpGet("Get-by-id-user")]
        [Authorize]
        public IActionResult GetByIdUser()
        {
            var UserId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var bill = context.TBillRooms.Include(b => b.TRooms).ThenInclude(b=> b.RoomType).Include(b=>b.Hotel).Where(b => b.UserId == UserId).ToList();
            if (bill == null)
            {
                return NotFound();
            }
            var billroom = bill.Select(r => new BillRoomDto
            {
                BillId = r.BillId,
                GuessName = r.GuessName,
                GuessEmail = r.GuessEmail,
                PhoneNumber = r.PhoneNumber,
                Amount = r.Amount,
                TotalPrice = r.TotalPrice,
                StartTime = r.StartTime,
                EndTime = r.EndTime,
                BuyTime = r.BuyTime,
                TRooms = r.TRooms,
                UserId = r.UserId,
                Hotel = r.Hotel,
            });
            return Ok(new { billroom });
        }
        [HttpGet("Get-by-id-Hotel/{id}")]
        [Authorize]
        public IActionResult GetByHotel(int id)
        {
            var userId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var hotel = context.THotels.FirstOrDefault(h => h.IdHotel == id);
            if (hotel == null)
            {
                return NotFound();
            }
            if(userId != hotel.UserId)
            {
                return Forbid("Không phải khách sạn của bạn");
            }
            var bill = context.TBillRooms.Include(b => b.TRooms).ThenInclude(b => b.RoomType).Include(b => b.Hotel).Where(b => b.HotelId == id).ToList();
            var billroom = bill.Select(r => new BillRoomDto
            {
                BillId = r.BillId,
                GuessName = r.GuessName,
                GuessEmail = r.GuessEmail,
                PhoneNumber = r.PhoneNumber,
                Amount = r.Amount,
                TotalPrice = r.TotalPrice,
                StartTime = r.StartTime,
                EndTime = r.EndTime,
                BuyTime = r.BuyTime,
                TRooms = r.TRooms,
                UserId = r.UserId,

            });
            return Ok(new { billroom });
        }
    }
}
