using System;
using Explora.Entity;

namespace Explora.dto
{
	public class RoomDto
	{
        public int IdRoom { get; set; }

        public int HotelId { get; set; }

        public int RoomTypeId { get; set; }

        public int RoomNumber { get; set; }

        public virtual TRoomType RoomType { get; set; } = null!;

        public int IsDelete { get; set; }

        public virtual THotel Hotel { get; set; } = null!;

        
    }
}

