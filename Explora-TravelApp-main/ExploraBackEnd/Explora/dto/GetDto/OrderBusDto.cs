using System;
using Explora.Entity;

namespace Explora.dto
{
	public class OrderBusDto
	{
        public int OrderId { get; set; }

        public int Amount { get; set; }

        public int TotalPrice { get; set; }

        public DateTime BuyTime { get; set; }

        public int UserId { get; set; }

        public int IdBus { get; set; }

        public ICollection<TBusTicket> TBusTickets { get; set; } = new List<TBusTicket>();
        public TBu IdBusNavigation { get; set; } = new TBu();

        public TUser User { get; set; } = null!;
    }
}

