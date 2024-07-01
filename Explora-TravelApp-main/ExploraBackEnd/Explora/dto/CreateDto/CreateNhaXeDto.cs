using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreateNhaXeDto
	{
        
        private string _name;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên nhà xe không được bỏ trống")]
        public string NhaXeName { get => _name; set => _name = value.Trim(); }
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Địa chỉ không được bỏ trống")]
        public string AddressNhaXe { get; set; }
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        public string PhoneNumber { get; set; } 
        
    }
}

