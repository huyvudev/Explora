using System;
using Explora.Entity;

namespace Explora.dto
{
	public class BusDto
	{
        public int IdBus { get; set; }
        public int Id_Nha_Xe { get; set; }
        public string BusName { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public DateTime StartTime { get; set; }
        public int Price { get; set; }
        public int Slot { get; set; }
        public int EmptySlot { get; set; }
        public int IsDelete { get; set; }
        public TNhaXe IdNhaXeNavigation { get; set; } = new TNhaXe();
    }
}

