using System;
using Explora.Entity;

namespace Explora.dto.GetDto
{
	public class RoomTypeDto
	{
        public int RoomTypeId { get; set; }

        public string RoomTypeName { get; set; }

        public string ImageUrl { get; set; }

        public int Price { get; set; }

        public int Area { get; set; }

        public int HotelId { get; set; }

        public virtual THotel hotel { get; set; }
    }
}

