using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class LoginDto
	{
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Mật khẩu không được bỏ trống")]
        public string Password { get; set; }
    }
}

