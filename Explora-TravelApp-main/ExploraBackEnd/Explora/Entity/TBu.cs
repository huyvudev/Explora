using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_BUS")]
public partial class TBu
{
    [Key]
    public int IdBus { get; set; }

    public int IdNhaXe { get; set; }

    public string BusName { get; set; } = null!;

    public int Price { get; set; }

    public int Slot { get; set; }

    public int EmptySlot { get; set; }

    public string StartPoint { get; set; } = null!;

    public string EndPoint { get; set; } = null!;

    public DateTime StartTime { get; set; }

    public int IsDelete { get; set; }

    [ForeignKey("IdNhaXe")]
    public virtual TNhaXe IdNhaXeNavigation { get; set; } = null!;

    public virtual ICollection<TBusTicket> TBusTickets { get; set; } = new List<TBusTicket>();

    public virtual ICollection<TOrderBu> TOrderBus { get; set; } = new List<TOrderBu>();
}
