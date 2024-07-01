using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity
{
	[Table("T_TYPE_ROOM")]
	public class  TRoomType
	{
		[Key]
		public int RoomTypeId { get; set; }

		public string RoomTypeName { get; set; }

        public string ImageUrl { get; set; }

		public int Price { get; set; }

		public int Area { get; set; }

		public int HotelId { get; set; }

		public virtual THotel hotel { get; set; }

		public ICollection<TRoom> Rooms { get; set; }

	}
}

