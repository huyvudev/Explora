using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreateRoleDto
	{
        
        [Required(ErrorMessage = "Tên Role không được bỏ trống ")]
        public string RoleName { get; set; }
        [Required(ErrorMessage = "Trạng thái Role không được bỏ trống ")]
        public string StatusRole { get; set; } 
    }
}

