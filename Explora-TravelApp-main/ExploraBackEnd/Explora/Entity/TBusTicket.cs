using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_BUS_TICKET")]
public partial class TBusTicket
{
    [Key]
    public int TicketId { get; set; }

    public int OrderId { get; set; }

    public string GuessName { get; set; } = null!;

    public string GuessEmail { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;


    public virtual TOrderBu Order { get; set; } = null!;
}
