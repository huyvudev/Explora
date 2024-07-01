using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreateAirlineDto
	{
        
        private string _name;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên không được bỏ trống")]
        public string AirlineName { get => _name; set => _name = value.Trim(); }
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; } 
        [Required(ErrorMessage = "Địa chỉ không được bỏ trống")]
        public string AddressAirline { get; set; }
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        public string PhoneNumber { get; set; } 
        
    }
}

