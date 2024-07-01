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
using Explora.dto.CreateDto;
using Explora.dto.GetDto;
using Explora.dto.UpdateDto;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypeController : Controller
    {
        private ExploraContext context;
        private Cloudinary cloudinary;
        public RoomTypeController(ExploraContext context, IConfiguration configuration)
        {
            this.context = context;
            cloudinary = new Cloudinary(configuration["Cloudinary:Url"]);
        }
        // GET: api/values
        [HttpPost("Create")]
        [Authorize(Roles = "HotelOwner")]
        [Consumes("multipart/form-data")]
        public IActionResult CreateRoomType([FromForm] CreateRoomTypeDto inputData)
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
            
            context.TRoomTypes.Add(new TRoomType
            {
                RoomTypeName = inputData.RoomTypeName,
                Price = inputData.Price,
                HotelId = inputData.HotelId,
                Area = inputData.Area,
                ImageUrl = uploadResult?.SecureUrl.AbsoluteUri ?? "",
               
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
        
       
        [HttpGet("Get-by-hotel/{id}")]
        public IActionResult GetTypeRoomByid(int id)
        {

            var query = context.TRoomTypes.Where(h => h.HotelId ==  id).
                        Select(h => new RoomTypeDto
                        {
                            RoomTypeId = h.RoomTypeId,
                            RoomTypeName = h.RoomTypeName,
                            Price = h.Price,
                            Area = h.Area,
                            HotelId = h.HotelId,
                            ImageUrl = h.ImageUrl,
                            hotel = h.hotel

                        });
            var result = query.ToList();
            return Ok(new { result });

        }
        
        [HttpPut("Update/{id}")]
        [Authorize(Roles = "HotelOwner")]
        [Consumes("multipart/form-data")]
        public IActionResult UpdateById(int id, [FromForm] UpdateRoomTypeDto dataUpdate)
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
            
            var roomtype = context.TRoomTypes.FirstOrDefault(r => r.RoomTypeId == id);
            if (roomtype == null )
            {
                return NotFound();
            }

            roomtype.RoomTypeName = dataUpdate.RoomTypeName;
            roomtype.Price = dataUpdate.Price;
            roomtype.Area = dataUpdate.Area;
            if (uploadResult != null)
            {
                roomtype.ImageUrl = uploadResult?.SecureUrl.AbsoluteUri ?? "";

            }
            context.SaveChanges();
            return Ok(new { roomtype });
        }
        

    }
}
