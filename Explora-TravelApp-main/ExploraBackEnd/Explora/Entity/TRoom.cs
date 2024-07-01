using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_ROOM")]
public partial class TRoom
{
    [Key]
    public int IdRoom { get; set; }

    public int HotelId { get; set; }

    public int RoomTypeId { get; set; }

    public int RoomNumber { get; set; }

    public virtual TRoomType RoomType { get; set; } = null!;

    public int IsDelete { get; set; }

    public virtual THotel Hotel { get; set; } = null!;

    public virtual ICollection<TBillRoom>? TBillRooms { get; set; } 

    

}
