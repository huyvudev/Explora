using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_NHA_XE")]
public partial class TNhaXe
{
    [Key]
    public int IdNhaXe { get; set; }

    public string NhaXeName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string AddressNhaXe { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int IsDelete { get; set; }

    public virtual ICollection<TBu> TBus { get; set; } = new List<TBu>();
}
