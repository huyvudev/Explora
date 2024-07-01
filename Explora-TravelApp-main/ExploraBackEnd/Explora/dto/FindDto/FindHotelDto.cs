using System;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto.FindDto
{
    public class FindHotelDto
    {
        [Required]
        private string _address;
        [FromQuery(Name = "AddressHotel")]
        public string AddressHotel { get => _address; set => _address = value.Trim(); }
        [DataType(DataType.Date)]
        public DateTime StartTime { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndTime { get; set; }
        public int RoomNumber { get; set; }
    }
}

