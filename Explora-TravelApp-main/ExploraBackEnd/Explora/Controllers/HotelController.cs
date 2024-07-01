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
using Explora.dto.FindDto;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : Controller
    {
        private ExploraContext context;
        private Cloudinary cloudinary;
        public HotelController(ExploraContext context, IConfiguration configuration)
        {
            this.context = context;
            cloudinary = new Cloudinary(configuration["Cloudinary:Url"]);
        }
        // GET: api/values
        [HttpPost("Create")]
        [Authorize(Roles = "HotelOwner")]
        [Consumes("multipart/form-data")]
        public IActionResult CreateHotel([FromForm]CreateHotelDto inputData)
        {
            ImageUploadResult? uploadResult = null;
            if (inputData.ImageUrl != null)
            {
                using (var filestream = inputData.ImageUrl.OpenReadStream())
                {
                    var uploadParam = new ImageUploadParams
                    {
                        File = new FileDescription(inputData.ImageUrl.FileName, filestream)

                    };
                    uploadResult = cloudinary.Upload(uploadParam);

                }
            }
            var HotelOwnerId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            context.THotels.Add(new THotel
            {
                HotelName = inputData.HotelName,
                Email = inputData.Email,
                AddressHotel = inputData.AddressHotel,
                PhoneNumber = inputData.PhoneNumber,
                UserId = HotelOwnerId,
                RoomCount = 0,
                ImageUrl = uploadResult?.SecureUrl.AbsoluteUri ?? "",
                IsDelete = 0
            }); 
            try
            {
                context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "Không tồn tại" });
            }
            return Ok();
        }
        [HttpGet("Get-all")]
        public IActionResult GetAllHotel()
        {
            var hotel = context.THotels.Where(h => h.IsDelete == 0).Select(h => new HotelDto
            {
                IdHotel = h.IdHotel,
                HotelName = h.HotelName,
                AddressHotel = h.AddressHotel,
                PhoneNumber = h.PhoneNumber,
                UserId = h.UserId,
                Email = h.Email,
                IsDelete = h.IsDelete,
                ImageUrl = h.ImageUrl
            });
            return Ok(new { hotels = hotel });
        }
        [HttpGet("Get-by-id/{id}")]
        public IActionResult GetHotelById(int id)
        {
            var hotel = context.THotels.Include(h => h.TRooms).Include(h=>h.RoomTypes).FirstOrDefault(h => h.IdHotel == id);
            if (hotel == null || hotel.IsDelete != 0)
            {
                return NotFound();
            }
            return Ok(new { hotel });
        }
        [HttpGet("Get-by-keyword")]
        public IActionResult GetHotelByKeyword([FromQuery] FindHotelDto inputData)
        {
            var query2 = context.THotels.Include(h => h.TRooms).ThenInclude(h => h.TBillRooms).Select(h => new {
                EmptyRoomCount = h.TRooms.Count(h=> !h.TBillRooms.Any(r => r.StartTime <= inputData.EndTime && r.EndTime >= inputData.StartTime)),
                hotel = h
            }).Where(h=>h.EmptyRoomCount >= inputData.RoomNumber && h.hotel.AddressHotel.Contains(inputData.AddressHotel)).ToList();
            return Ok(new { query2 });

        }
        [HttpGet("Get-by-id-hotel-owner")]
        [Authorize(Roles = "HotelOwner")]
        public IActionResult GetByIdUser()
        {
            var HotelOwner = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var hotel = context.THotels.Where(b => b.UserId == HotelOwner && b.IsDelete == 0).ToList();
            if (hotel == null)
            {
                return NotFound();
            }
            var hotels = hotel.Select(h => new HotelDto
            {
                IdHotel = h.IdHotel,
                HotelName = h.HotelName,
                AddressHotel = h.AddressHotel,
                PhoneNumber = h.PhoneNumber,
                UserId = h.UserId,
                Email = h.Email,
                IsDelete = h.IsDelete,
                ImageUrl = h.ImageUrl
            });
            return Ok(new { hotels });
        }
        [HttpPut("Update/{id}")]
        [Authorize(Roles = "HotelOwner")]
        [Consumes("multipart/form-data")]
        public IActionResult UpdateById(int id,[FromForm] UpdateHotelDto dataUpdate)
        {
            ImageUploadResult? uploadResult = null;
            if (dataUpdate.ImageUrl != null)
            {
                using (var filestream = dataUpdate.ImageUrl.OpenReadStream())
                {
                    var uploadParam = new ImageUploadParams
                    {
                        File = new FileDescription(dataUpdate.ImageUrl.FileName, filestream)

                    };
                    uploadResult = cloudinary.Upload(uploadParam);

                }
            }
            var userId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var hotel = context.THotels.FirstOrDefault(r => r.IdHotel == id);
            if (hotel == null || hotel.IsDelete != 0)
            {
                return NotFound();
            }
            if (userId != hotel.UserId)
            {
                return Forbid("Không phải khách sạn của bạn");
            }
            hotel.Email = dataUpdate.Email;
            hotel.AddressHotel = dataUpdate.AddressHotel;
            hotel.PhoneNumber = dataUpdate.PhoneNumber;
            if (uploadResult != null)
            {
                hotel.ImageUrl = uploadResult?.SecureUrl.AbsoluteUri ?? "";

            }
            context.SaveChanges();
            return Ok(new { hotel });
        }
        [HttpDelete("Delete/{id}")]
        [Authorize(Roles = "HotelOwner")]
        public IActionResult DeleteById(int id)
        {
            var userId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var hotel = context.THotels.FirstOrDefault(r => r.IdHotel == id);
            if (hotel == null || hotel.IsDelete != 0)
            {
                return NotFound();
            }
            if (userId != hotel.UserId)
            {
                return Forbid("Không phải khách sạn của bạn");
            }
            hotel.IsDelete = 1;
            context.SaveChanges();
            return Ok();
        }
        [HttpGet("Get-empty-room-by-hotelid/{id}")]
        public IActionResult GetEmptyRoom(int id, [FromQuery]FindEmptyRoomDto findEmpty)
        {
            var query2 = context.TRoomTypes.Include(h => h.Rooms).Select(h => new {
                EmptyRoomCount = h.Rooms.Count(h => !h.TBillRooms.Any(r => r.StartTime <= findEmpty.EndTime && r.EndTime >= findEmpty.StartTime)),
                RoomType = h
            }).Where(h => h.EmptyRoomCount > 0 && h.RoomType.HotelId == id).ToList();
            return Ok(new { query2 });
        }
    }
}
