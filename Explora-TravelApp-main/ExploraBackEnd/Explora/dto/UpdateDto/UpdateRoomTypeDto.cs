using System;
namespace Explora.dto.UpdateDto
{
	public class UpdateRoomTypeDto
	{
        public string RoomTypeName { get; set; }

        public IFormFile? ImageUrl { get; set; }

        public int Price { get; set; }

        public int Area { get; set; }
    }
}

