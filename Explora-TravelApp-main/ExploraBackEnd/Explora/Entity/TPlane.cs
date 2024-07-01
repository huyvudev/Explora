using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_PLANE")]
public partial class TPlane
{
    [Key]
    public int IdPlane { get; set; }

    public string PlaneName { get; set; } = null!;

    public int Price { get; set; }

    public int Slot { get; set; }

    public int EmptySlot { get; set; }

    public string StartPoint { get; set; } = null!;

    public string EndPoint { get; set; } = null!;

    public DateTime StartTime { get; set; }

    public int IsDelete { get; set; }

    public int IdAirline { get; set; }

    [ForeignKey("IdAirline")]
    public virtual TAirline IdAirlineNavigation { get; set; } = null!;

    public virtual ICollection<TOrderPlane> TOrderPlanes { get; set; } = new List<TOrderPlane>();

    public virtual ICollection<TPlaneTicket> TPlaneTickets { get; set; } = new List<TPlaneTicket>();
}
