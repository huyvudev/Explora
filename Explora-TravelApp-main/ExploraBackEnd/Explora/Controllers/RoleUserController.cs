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
    public class RoleUserController : Controller
    {
        private ExploraContext context;
        public RoleUserController(ExploraContext context)
        {
            this.context = context;
        }
        // GET: api/values
        [HttpPost("Create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateRoleUser(CreateRoleUserDto inputData)
        {
            context.TRoleUsers.Add(new TRoleUser
            {

                RoleId = inputData.RoleId,
                UserId = inputData.UserId
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
        public IActionResult GetAllRoleUser()
        {
            var roleUser = context.TRoleUsers.Select(ru => new RoleUserDto
            {
                Id = ru.Id,
                RoleId = ru.RoleId,
                UserId = ru.UserId
            });
            return Ok(new { roleUser });
        }
        [HttpGet("Get-by-id/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetRoleUserById(int id)
        {
            var roleUser = context.TRoleUsers.FirstOrDefault(ru => ru.Id == id);
            if (roleUser == null)
            {
                return NotFound();
            }
            return Ok(new { roleUser });
        }
        [HttpPut("Update/{userId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateById(int userId, UpdateRoleUserDto dataUpdate)
        {
            var user = context.TRoleUsers.FirstOrDefault(ru => ru.UserId == userId);
            if (user == null)
            {
                return NotFound();
            }
            user.RoleId = dataUpdate.RoleId;
            
            context.SaveChanges();
            return Ok(new { user });
        }

    }
}
