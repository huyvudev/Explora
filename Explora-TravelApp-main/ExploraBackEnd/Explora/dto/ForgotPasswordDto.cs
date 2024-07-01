using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class ForgotPasswordDto
	{
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; }
    }
}

