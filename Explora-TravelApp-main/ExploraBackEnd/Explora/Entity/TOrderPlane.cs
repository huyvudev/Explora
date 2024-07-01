using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_ORDER_PLANE")]
public partial class TOrderPlane
{
    [Key]
    public int OrderId { get; set; }

    public int Amount { get; set; }

    public int TotalPrice { get; set; }

    public DateTime BuyTime { get; set; }

    public int UserId { get; set; }

    public int IdPlane { get; set; }

    [ForeignKey("IdPlane")]
    public virtual TPlane IdPlaneNavigation { get; set; } = null!;

    public virtual ICollection<TPlaneTicket> TPlaneTickets { get; set; } = new List<TPlaneTicket>();

    public virtual TUser User { get; set; } = null!;
}
