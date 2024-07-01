using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Explora.dto;
using Explora.data;
using Explora.Entity;
using Explora.Service;
using Microsoft.EntityFrameworkCore;
using System.Text.Encodings.Web;

namespace Explora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private ExploraContext context;
        private AuthenticationService authen;
        private IConfiguration _configuration;
        private EmailService emailservice;
        public AuthController(AuthenticationService authen, ExploraContext context, IConfiguration _configuration, EmailService emailservice)
        {
            this.authen = authen;
            this.context = context;
            this._configuration = _configuration;
            this.emailservice = emailservice;
        }
        [HttpPost("Sign-up")]
        public IActionResult CreateUser(CreateUserDto inputData)
        {
            var userCheck = context.TUsers.FirstOrDefault(uc => uc.Email == inputData.Email);
            if ( userCheck != null)
            {
                return BadRequest(new { message = "Email đã tồn tại" });
            }
            var user = new TUser
            {

                UserName = inputData.Name,
                Email = inputData.Email,
                PhoneNumber = inputData.PhoneNumber,
                PasswordUser = inputData.PasswordUser,
                DateOfBirth = inputData.DateOfBirth,
                UrlAvatar = inputData.UrlAvatar,
                
            };
            context.TUsers.Add(user);
            context.SaveChanges();
            user.TRoleUsers.Add(new TRoleUser
            {
                UserId = user.UserId,
                RoleId = 2
            });
            var token = authen.CreateRandomString(6);
            user.EmailConfirmToken = token;
            context.SaveChanges();
            emailservice.SendEmailAsync(user.Email, "Confirm Email", $"Mã xác thực của bạn là {token}");
            return Ok();
        }
        [HttpPost("Login")]
        public IActionResult Login(LoginDto inputData)
        {
            var user = context.TUsers.Include(u => u.TRoleUsers).ThenInclude(r => r.Role).FirstOrDefault(u => u.Email == inputData.Email && u.PasswordUser == inputData.Password);
            
            if (user == null)
            {
                return BadRequest(new {message = "Email hoặc mật khẩu không chính xác" });
            }
            
            
            return Ok(new
            {
                
                user = user,
                accessToken = authen.jwtToken(user, _configuration)
            }) ;
        }
        [HttpGet("Confirm-email")]
        public IActionResult ConfirmEmail(string token)
        {
            var UserId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var user = context.TUsers.FirstOrDefault(u => u.UserId == UserId);
            if (user != null && user.EmailConfirmToken == token)
            {
                user.EmailConfirm = 1;
                user.EmailConfirmToken = null;
                context.SaveChanges();
                return Ok();
            }
            return BadRequest("Token không hợp lệ");
        }
        [HttpPost("Resend-confirm-email")]
        public IActionResult ResendConfirmEmail()
        {
            var UserId = Int32.Parse(User.FindFirst("Id")?.Value ?? "0");
            var user = context.TUsers.FirstOrDefault(u => u.UserId == UserId);
            var token = authen.CreateRandomString(6);
            user.EmailConfirmToken = token;
            context.SaveChanges();
            emailservice.SendEmailAsync(user.Email, "Confirm Email", $"Mã xác thực của bạn là {token}");
            return Ok();
        }
        [HttpPost("Send-email-reset-password")]
        public IActionResult SendEmailResetPassword(ForgotPasswordDto inputData)
        {
            var user = context.TUsers.FirstOrDefault(u => u.Email == inputData.Email);
            if(user == null)
            {
                return BadRequest(new { message = "Email không tồn tại" });
            }
            var token = authen.CreateRandomString(6);
            user.ResetPasswordToken = token;
            context.SaveChanges();
            emailservice.SendEmailAsync(user.Email, "Reset password", $"Mã xác thực của bạn là {token}");
            return Ok();
        }
        [HttpPost("Reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordDto dataUpdate)
        {
            var user = context.TUsers.FirstOrDefault(u => u.Email == dataUpdate.Email);
            if (user.ResetPasswordToken == dataUpdate.token)
            {
                user.PasswordUser = dataUpdate.PasswordUser;
                context.SaveChanges();
                return Ok();
            }
            return BadRequest(new { message = "Token không hợp lệ" });
        }
    }
}
