using System;
using Explora.Entity;

namespace Explora.dto
{
	public class OrderPlaneDto
	{
        public int OrderId { get; set; }

        public int Amount { get; set; }

        public int TotalPrice { get; set; }

        public DateTime BuyTime { get; set; }

        public int UserId { get; set; }

        public int IdPlane { get; set; }

        public ICollection<TPlaneTicket> TPlaneTickets { get; set; } = new List<TPlaneTicket>();
        public TPlane IdPlaneNavigation { get; set; } = new TPlane();

        public TUser User { get; set; } = null!;
    }
}

