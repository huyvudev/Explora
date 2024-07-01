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


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : Controller
    {
        private ExploraContext context;
        public RoleController(ExploraContext context)
        {
            this.context = context;
        }
        // GET: api/values
        [HttpPost("Create")]
        public IActionResult CreateRole(CreateRoleDto inputData)
        {
            context.TRoles.Add(new TRole
            {

                RoleName = inputData.RoleName,
                StatusRole = inputData.StatusRole
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
        public IActionResult GetAllRole()
        {
            var role = context.TRoles.Select(r => new RoleDto
            {
                RoleId = r.RoleId,
                RoleName = r.RoleName,
                StatusRole = r.StatusRole
            });
            return Ok(new { role });
        }
        [HttpGet("Get-by-id/{id}")]
        public IActionResult GetRoleById(int id)
        {
            var role = context.TRoles.FirstOrDefault(r => r.RoleId == id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(new { role });
        }
        [HttpPut("Update/{id}")]
        public IActionResult UpdateById(int id, UpdateRoleDto dataUpdate)
        {
            var role = context.TRoles.FirstOrDefault(r => r.RoleId == id);
            if (role == null)
            {
                return NotFound();
            }
            role.RoleName = dataUpdate.RoleName;
            role.StatusRole = dataUpdate.StatusRole;
            context.SaveChanges();
            return Ok(new { role });
        }
        
    }
}
