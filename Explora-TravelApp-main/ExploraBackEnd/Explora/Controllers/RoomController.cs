using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Explora.dto;
using Explora.data;
using Explora.Entity;
using System.Collections;
using System.Xml.Linq;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Explora.dto.FindDto;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : Controller
    {
        private ExploraContext context;
        private Cloudinary cloudinary;
        public RoomController(ExploraContext context,IConfiguration configuration )
        {
            this.context = context;
            cloudinary = new Cloudinary(configuration["Cloudinary:Url"]);
        }
        
        // GET: api/values
        [HttpPost("Create")]
        [Authorize(Roles = "HotelOwner")]
       
        public IActionResult CreateRoom(CreateRoomDto inputData)
        {


            var hotel = context.THotels.Include(h=>h.TRooms).FirstOrDefault(h => h.IdHotel == inputData.HotelId);
            if (hotel == null)
            {
                return NotFound();
            }
            if (hotel.TRooms.Any(h=>h.RoomNumber==inputData.RoomNumber && h.IsDelete == 0) )
            {
                return BadRequest(new { message = "Phòng đã tồn tại" });
            }
            context.TRooms.Add(new TRoom
            { 
                
                HotelId = inputData.HotelId,
                RoomTypeId = inputData.RoomTypeId,
                RoomNumber = inputData.RoomNumber,
                IsDelete=0
            });;
            hotel.RoomCount++;
            try
            {
                context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "Không tồn tại khách sạn" });
            }
            return Ok();
        }
        [HttpGet("Get-all")]
        public IActionResult GetAllRoom()
        {
            var room = context.TRooms.Where(r => r.IsDelete == 0).Select(r => new RoomDto
            {
                IdRoom = r.IdRoom,  
                HotelId = r.HotelId,
                RoomTypeId = r.RoomTypeId,
                RoomNumber = r.RoomNumber,
                RoomType = r.RoomType,
                IsDelete = r.IsDelete,
                Hotel = r.Hotel,
            });
            return Ok(new { room });
        }
        
        [HttpGet("Get-by-id/{id}")]
        public IActionResult GetRoomById(int id)
        {
            var room = context.TRooms.FirstOrDefault(r => r.IdRoom == id);
            if (room == null || room.IsDelete != 0)
            {
                return NotFound();
            }
            return Ok(new { room });
        }
        [HttpGet("Get-all-room-by-hotel/{hotelId}")]
        [Authorize(Roles = "HotelOwner")]
        public IActionResult GetAllRoomByHotel(int hotelId)
        {
            var userId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var hotel = context.THotels.FirstOrDefault(h => h.IdHotel == hotelId);
            if (hotel == null || hotel.IsDelete != 0)
            {
                return NotFound();
            }
            if (userId != hotel.UserId)
            {
                return Forbid("Không phải khách sạn của bạn");
            }
            var room = context.TRooms.Where(r => r.HotelId == hotelId && r.IsDelete ==0).Select(r => new RoomDto
            {
                IdRoom = r.IdRoom,
                HotelId = r.HotelId,
                RoomTypeId = r.RoomTypeId,
                RoomNumber = r.RoomNumber,
                RoomType = r.RoomType,
                IsDelete = r.IsDelete,
                Hotel = r.Hotel,
            });
            return Ok(new { room });


        }
        /*[HttpPut("Update/{id}")]
        [Authorize(Roles = "HotelOwner")]
        [Consumes("multipart/form-data")]
        public IActionResult UpdateById(int id, UpdateRoomDto dataUpdate)
        {
            

            var room = context.TRooms.FirstOrDefault(r => r.IdRoom == id);
            if (room == null || room.IsDelete != 0)
            {
                return NotFound();
            }
            
           
            room.Price = dataUpdate.Price;
            
            if(uploadResult != null)
            {
                room.ImageUrl = uploadResult?.SecureUrl.AbsoluteUri ?? "";

            }
            context.SaveChanges();
            return Ok(room);
        }*/
        [HttpDelete("Delete/{id}")]
        [Authorize(Roles = "HotelOwner")]
        public IActionResult DeleteById(int id)
        {
            var room = context.TRooms.FirstOrDefault(r => r.IdRoom == id);
            if (room == null || room.IsDelete != 0)
            {
                return NotFound();
            }
            room.IsDelete = 1;
            var hotel = context.THotels.FirstOrDefault(h => h.IdHotel == room.HotelId);
            hotel.RoomCount--;
            context.SaveChanges();
            return Ok();
        }
    }
}
