using System;
namespace Explora.dto
{
	public class UserDto
	{
        public int UserId { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string UrlAvatar { get; set; }
        public string Role { get; set; }
    }
}

