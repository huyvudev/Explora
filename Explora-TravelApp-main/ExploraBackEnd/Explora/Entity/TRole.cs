using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_ROLE")]
public partial class TRole
{
    [Key]
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public string StatusRole { get; set; } = null!;

    public virtual ICollection<TRoleUser> TRoleUsers { get; set; } = new List<TRoleUser>();
}
