using System;
using Explora.Entity;

namespace Explora.dto
{
	public class BillRoomDto
	{
        public int BillId { get; set; }

        public string GuessName { get; set; } = null!;

        public string GuessEmail { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public int Amount { get; set; }


        public int TotalPrice { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public DateTime BuyTime { get; set; }

        public int UserId { get; set; }

        public  ICollection<TRoom> TRooms { get; set; }

        public THotel Hotel { get; set; }


    }
}

