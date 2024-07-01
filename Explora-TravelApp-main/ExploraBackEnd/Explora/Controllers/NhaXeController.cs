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


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhaXeController : Controller
    {
        private ExploraContext context;
        public NhaXeController(ExploraContext context)
        {
            this.context = context;
        }
        // GET: api/values
        [HttpPost("Create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateNhaXe(CreateNhaXeDto inputData)
        {
            context.TNhaXes.Add(new TNhaXe
            {
                NhaXeName = inputData.NhaXeName,
                Email = inputData.Email,
                AddressNhaXe = inputData.AddressNhaXe,
                PhoneNumber = inputData.PhoneNumber,
                IsDelete = 0
            }); ;
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
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllNhaXe()
        {
            var nhaxe = context.TNhaXes.Where(n => n.IsDelete == 0).Select(n => new NhaXeDto
            {
                IdNhaXe = n.IdNhaXe,
                NhaXeName = n.NhaXeName,
                Email = n.Email,
                AddressNhaXe = n.AddressNhaXe,
                PhoneNumber = n.PhoneNumber,
                IsDelete = n.IsDelete
            });
            return Ok(new { nhaxe });
        }
        [HttpGet("Get-by-id/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetNhaXeById(int id)
        {
            var nhaxe  = context.TNhaXes.FirstOrDefault(n => n.IdNhaXe == id);
            if (nhaxe == null || nhaxe.IsDelete != 0)
            {
                return NotFound();
            }
            return Ok(new { nhaxe });
        }
        [HttpPut("Update/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateById(int id, UpdateNhaXeDto dataUpdate)
        {
            var nhaxe = context.TNhaXes.FirstOrDefault(n => n.IdNhaXe == id);
            if (nhaxe == null || nhaxe.IsDelete != 0)
            {
                return NotFound();
            }
            nhaxe.Email = dataUpdate.Email;
            nhaxe.AddressNhaXe = dataUpdate.AddressNhaXe;
            nhaxe.PhoneNumber = dataUpdate.PhoneNumber;
            context.SaveChanges();
            return Ok(new { nhaxe });
        }
        [HttpDelete("Delete/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteById(int id)
        {
            var nhaxe = context.TNhaXes.FirstOrDefault(n => n.IdNhaXe == id);
            if (nhaxe == null || nhaxe.IsDelete != 0)
            {
                return NotFound();
            }
            nhaxe.IsDelete = 1;
            context.SaveChanges();
            return Ok();
        }
    }
}
