using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_PLANE_TICKET")]
public partial class TPlaneTicket
{
    [Key]
    public int TicketId { get; set; }

    public int OrderId { get; set; }

    public string GuessName { get; set; } = null!;

    public string GuessEmail { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public DateTime DateOfBirth { get; set; }

    public string Nationality { get; set; } = null!;

    public string PasspostNumber { get; set; } = null!;

    public DateTime ExpiredTime { get; set; }

    public virtual TOrderPlane Order { get; set; } = null!;
}
