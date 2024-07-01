using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class ResetPasswordDto
	{
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Token không được bỏ trống")]

        public string token { get; set; }
        [Required(ErrorMessage = "Password không được bỏ trống")]

        public string PasswordUser { get; set; }
	}
}

