using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Explora.dto;
using Explora.data;
using Explora.Entity;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Explora.dto.FindDto;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : Controller
    {
        private ExploraContext context;
        public BusController(ExploraContext context)
        {
            this.context = context;
        }
        [HttpPost("Create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateBus(CreateBusDto inputData)
        {
            var nhaxe = context.TNhaXes.FirstOrDefault(n => n.IdNhaXe == inputData.IdNhaXe);
            if(nhaxe == null || nhaxe.IsDelete != 0)
            {
                return NotFound();
            }
            context.TBus.Add(new TBu
            {
                
                BusName = inputData.BusName,
                IdNhaXe = inputData.IdNhaXe,
                StartPoint = inputData.StartPoint,
                EndPoint = inputData.EndPoint,
                StartTime = inputData.StartTime,
                Price = inputData.Price,
                Slot = inputData.Slot,
                EmptySlot = inputData.Slot,
                IsDelete= 0
            });
            try
            {
                context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "Không tồn tại nhà xe" });
            }
            return Ok();
        }
        [HttpGet("Get-all")]
        public IActionResult GetAllBus()
        {
            var bus = context.TBus.Where(b => b.IsDelete == 0).Include(b => b.IdNhaXeNavigation).Select(b => new BusDto
            {
                IdBus = b.IdBus,
                Id_Nha_Xe = b.IdNhaXe,
                BusName = b.BusName,
                StartPoint = b.StartPoint,
                EndPoint = b.EndPoint,
                StartTime = b.StartTime,
                Price = b.Price,
                Slot = b.Slot,
                EmptySlot = b.EmptySlot,
                IsDelete =b.IsDelete,
                IdNhaXeNavigation = b.IdNhaXeNavigation
            });
            return Ok(new { bus });
        }
        [HttpGet("Get-by-keyword")]
        public IActionResult GetBusByKeyword([FromQuery] FindDto inputData)
        {
            var from = inputData.StartTime;
            var to = from.AddDays(1);
            var now = DateTime.Now;
            var query = context.TBus.Where(b => b.StartPoint == inputData.StartPoint
                        && b.EndPoint == inputData.EndPoint && (b.StartTime >= from && b.StartTime <= to && b.StartTime > now)).
                        Include(b=> b.IdNhaXeNavigation).Select(b => new BusDto
                        {
                            IdBus = b.IdBus,
                            Id_Nha_Xe = b.IdNhaXe,
                            BusName = b.BusName,
                            StartPoint = b.StartPoint,
                            EndPoint = b.EndPoint,
                            StartTime = b.StartTime,
                            Price = b.Price,
                            Slot = b.Slot,
                            EmptySlot = b.EmptySlot,
                            IsDelete = b.IsDelete,
                            IdNhaXeNavigation = b.IdNhaXeNavigation
                        });
            var result = query.ToList();
            return Ok(new { result });

        }

        [HttpGet("Get-by-id/{id}")]
        public IActionResult GetBusById(int id)
        {
            var bus = context.TBus.Include(b => b.IdNhaXeNavigation).FirstOrDefault(b => b.IdBus == id);
            if (bus == null || bus.IsDelete != 0)
            {
                return NotFound();
            }
            return Ok(new { bus });
        }
        [HttpPut("Update/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateById(int id,UpdateBusDto dataUpdate)
        {
            var bus = context.TBus.FirstOrDefault(b => b.IdBus == id);
            if (bus == null || bus.IsDelete != 0)
            {
                return NotFound();
            }
            bus.StartTime = dataUpdate.StartTime;
            bus.Price = dataUpdate.Price;
            context.SaveChanges();
            return Ok(new { bus });
        }
        [HttpDelete("Delete/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteById(int id)
        {
            var bus = context.TBus.FirstOrDefault(b => b.IdBus == id);
            if(bus == null || bus.IsDelete != 0) 
            {
                return NotFound();
            }
            bus.IsDelete = 1;
            context.SaveChanges();
            return Ok();
        }
    }
}

