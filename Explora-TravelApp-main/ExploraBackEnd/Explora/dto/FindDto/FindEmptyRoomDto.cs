using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto.FindDto
{
	public class FindEmptyRoomDto
	{
        [DataType(DataType.Date)]
        public DateTime StartTime { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndTime { get; set; }
	}
}

