using System;
using System.ComponentModel.DataAnnotations;

namespace Explora.dto
{
	public class CreateBusDto
	{
        
        [Required(ErrorMessage = "Id nhà xe không được bỏ trống")]
        public int IdNhaXe { get; set; }
        private string _name;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên không được bỏ trống")]
        public string BusName { get => _name; set => _name = value.Trim(); }
        private string _start;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Điểm khởi hành không được bỏ trống")]
        public string StartPoint { get => _start; set => _start = value.Trim(); }
        private string _end;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Điểm đến không được bỏ trống")]
        public string EndPoint { get=>_end; set => _end = value.Trim(); }
        [Required(ErrorMessage = "Thời gian không được bỏ trống")]
        public DateTime StartTime { get; set; }
        [Required(ErrorMessage = "Giá không được bỏ trống")]
        public int Price { get; set; }
        [Required(ErrorMessage = "Số lượng còn lại không được bỏ trống")]
        public int Slot { get; set; }
        
    }
}

