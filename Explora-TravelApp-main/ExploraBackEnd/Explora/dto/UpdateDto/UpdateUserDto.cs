using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class UpdateUserDto
	{
        public string Name { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }
        public string Password { get; set; }
        
    }
}

