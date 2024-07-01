using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
    
    public class CreateUserDto
	{
        
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        public string PhoneNumber { get; set; }
        private string _name;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên không được bỏ trống")]
        public string Name { get => _name; set => _name = value.Trim(); }
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }
        [Required(ErrorMessage = "Mật khẩu không được bỏ trống")]
        public string PasswordUser { get; set; }
        public string UrlAvatar { get; set; }
    }
}

