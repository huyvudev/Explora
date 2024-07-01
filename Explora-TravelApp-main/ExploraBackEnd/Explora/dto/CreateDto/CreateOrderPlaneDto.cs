using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreateOrderPlaneDto
	{
        [Required(ErrorMessage = "Số vé không được bỏ trống")]
        public int Amount { get; set; }
        [Required(ErrorMessage = "Id xe không được bỏ trống")]
        public int IdPlane { get; set; }

        public CreatePlaneTicketDto[] createPlaneTicketDtos
        {
            get;set;
        } 
    }
}

