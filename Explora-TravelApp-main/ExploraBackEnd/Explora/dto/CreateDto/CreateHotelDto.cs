using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreateHotelDto
	{
        
        private string _name;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên khách sạn không được bỏ trống")]
        public string HotelName { get => _name; set => _name = value.Trim(); }
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Địa chỉ không được bỏ trống")]
        public string AddressHotel { get; set; }
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        public string PhoneNumber { get; set; }
        public IFormFile? ImageUrl { get; set; }
    }
}

