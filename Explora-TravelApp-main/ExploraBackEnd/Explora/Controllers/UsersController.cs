using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Explora.dto;
using Explora.data;
using Explora.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private ExploraContext context;
        public UsersController(ExploraContext context)
        {
            this.context = context;
        }
        // GET: api/values
        [HttpGet("Get-all")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllUser()
        {
            var user = context.TUsers.Include(u => u.TRoleUsers).ThenInclude(r => r.Role).Select(u => new UserDto
            {
                UserId = u.UserId,
                UserName = u.UserName,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                DateOfBirth = u.DateOfBirth,
                UrlAvatar = u.UrlAvatar,
                Role = u.Role,
            });
            return Ok(new { user });
        }
        [HttpGet("Get-by-token")]
        public IActionResult GetUserById()
        {
            var UserId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var user = context.TUsers.Include(u => u.TRoleUsers).ThenInclude(r => r.Role).FirstOrDefault(u => u.UserId == UserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(new UserDto
            {
                UserId = user.UserId,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                UserName = user.UserName,
                DateOfBirth = user.DateOfBirth,
                UrlAvatar = user.UrlAvatar,
                Role = user.TRoleUsers.ToList()[0].Role.RoleName,
            });
        }
        [HttpPut("Update")]
        public IActionResult UpdateUserByToken(UpdateUserDto dataUpdate)
        {
            var UserId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var user = context.TUsers.Include(u => u.TRoleUsers).ThenInclude(r => r.Role).FirstOrDefault(u => u.UserId == UserId);
            if ( user == null)
            {
                return NotFound();
            }
            user.UserName = dataUpdate.Name;
            user.DateOfBirth = dataUpdate.DateOfBirth;
            user.PasswordUser = dataUpdate.Password;
            context.SaveChanges();
            return Ok(new UserDto
            {
                UserId = user.UserId,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                UserName = user.UserName,
                DateOfBirth = user.DateOfBirth,
                UrlAvatar = user.UrlAvatar,
                Role = user.TRoleUsers.ToList()[0].Role.RoleName,
            });
        }
        [HttpGet]
        [Authorize]
        public IActionResult GetUserByToken()
        {
            var UserId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var user = context.TUsers.Include(u => u.TRoleUsers).ThenInclude(r => r.Role).FirstOrDefault(u => u.UserId == UserId);
            return Ok(new UserDto
            {
                UserId = user.UserId,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                UserName = user.UserName,
                DateOfBirth = user.DateOfBirth,
                UrlAvatar = user.UrlAvatar,
                Role = user.TRoleUsers.ToList()[0].Role.RoleName,
            });
            
           
        }

    }
}

    