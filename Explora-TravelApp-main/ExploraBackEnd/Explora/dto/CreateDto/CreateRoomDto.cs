using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreateRoomDto
	{

        public int HotelId { get; set; }

        public int RoomTypeId { get; set; }

        public int RoomNumber { get; set; }


    }
}

