using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Explora.dto.FindDto
{
	public class FindDto
	{
        [Required]
        private string _start;
        [FromQuery(Name = "StartPoint")]
        public string StartPoint { get => _start; set => _start = value.Trim(); }
        [Required]
        private string _end;

        [FromQuery(Name = "EndPoint")]
        public string EndPoint { get => _end; set => _end = value.Trim(); }
        [Required]
        [FromQuery(Name = "StartTime")]
        [DataType(DataType.Date)]
        public DateTime StartTime { get; set; }
    }
}

