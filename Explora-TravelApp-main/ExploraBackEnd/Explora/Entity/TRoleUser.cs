using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_ROLE_USER")]
public partial class TRoleUser
{
    [Key]
    public int Id { get; set; }

    public int RoleId { get; set; }

    public int UserId { get; set; }

    public virtual TRole Role { get; set; } = null!;

    public virtual TUser User { get; set; } = null!;
}
