using System;
namespace Explora.dto
{
	public class UpdateHotelDto
	{
        public string Email { get; set; }
        public string AddressHotel { get; set; }
        public string PhoneNumber { get; set; }
        public IFormFile? ImageUrl { get; set; }
    }
}

