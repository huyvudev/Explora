using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreateOrderBusDto
	{
        [Required(ErrorMessage = "Số vé không được bỏ trống")]
        public int Amount { get; set; }
        [Required(ErrorMessage = "Id xe không được bỏ trống")]

        public int IdBus { get; set; }

        public CreateBusTicketDto[] createBusTicketDtos
        {
            get; set;
        }
    }
}

