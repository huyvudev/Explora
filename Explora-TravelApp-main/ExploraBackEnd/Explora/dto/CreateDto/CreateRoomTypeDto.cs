using System;
namespace Explora.dto.CreateDto
{
	public class CreateRoomTypeDto
	{
        public string RoomTypeName { get; set; }

        public IFormFile? ImageUrl { get; set; }

        public int Price { get; set; }

        public int Area { get; set; }
        public int HotelId { get; set; }
    }
}

