using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Explora.Entity;

[Table("t_BILL_ROOM")]
public partial class TBillRoom
{
    [Key]
    public int BillId { get; set; }

    public string GuessName { get; set; } = null!;

    public string GuessEmail { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int Amount { get; set; }

   

    public int TotalPrice { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public DateTime BuyTime { get; set; }

    public int UserId { get; set; }

    

    public int HotelId { get; set; }
    public virtual ICollection <TRoom>? TRooms { get; set; }
    public THotel Hotel { get; set; }



    public virtual TUser User { get; set; } = null!;
}
