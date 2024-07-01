using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreateRoleUserDto
	{
        [Required(ErrorMessage = "ID Role không được bỏ trống ")]
        public int RoleId { get; set; }
        [Required(ErrorMessage = "ID User không được bỏ trống ")]
        public int UserId { get; set; }
    }
}

