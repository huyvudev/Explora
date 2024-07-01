using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_ORDER_BUS")]
public partial class TOrderBu
{
    [Key]
    public int OrderId { get; set; }

    public int Amount { get; set; }

    public int TotalPrice { get; set; }

    public DateTime BuyTime { get; set; }

    public int UserId { get; set; }

    public int IdBus { get; set; }

    [ForeignKey("IdBus")]
    public virtual TBu IdBusNavigation { get; set; } = null!;

    public virtual ICollection<TBusTicket> TBusTickets { get; set; } = new List<TBusTicket>();

    public virtual TUser User { get; set; } = null!;
}
