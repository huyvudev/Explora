using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreatePlaneTicketDto
	{
        private string _name;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên không được bỏ trống")]
        public string GuessName { get => _name; set => _name = value.Trim(); }
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string GuessEmail { get; set; } 
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        public string PhoneNumber { get; set; } 
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }
        [Required(ErrorMessage = "Quốc tịch không được bỏ trống")]
        public string Nationality { get; set; } = null!;
        [Required(ErrorMessage = "Quốc tịch không được bỏ trống")]
        public string PasspostNumber { get; set; } = null!;
        [DataType(DataType.Date)]
        public DateTime ExpiredTime { get; set; }

        

    }
}

