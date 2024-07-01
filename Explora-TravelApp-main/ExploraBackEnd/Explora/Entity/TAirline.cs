using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_AIRLINE")]
public partial class TAirline
{
    [Key]
    public int IdAirline { get; set; }

    public string AirlineName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string AddressAirline { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int IsDelete { get; set; }

    public virtual ICollection<TPlane> TPlanes { get; set; } = new List<TPlane>();
}
