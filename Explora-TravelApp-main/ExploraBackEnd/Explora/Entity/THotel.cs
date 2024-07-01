using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_HOTEL")]
public partial class THotel
{
    [Key]
    public int IdHotel { get; set; }

    public string HotelName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string AddressHotel { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int RoomCount { get; set; }

    public int IsDelete { get; set; }

    public int UserId { get; set; }

    public string ImageUrl { get; set; }

    public virtual ICollection<TRoom> TRooms { get; set; } = new List<TRoom>();

    public virtual ICollection<TRoomType> RoomTypes { get; set; } = new List<TRoomType>();

    public virtual ICollection<TBillRoom> BillRooms { get; set; } = new List<TBillRoom>();

    public virtual TUser User { get; set; } = null!;
}
