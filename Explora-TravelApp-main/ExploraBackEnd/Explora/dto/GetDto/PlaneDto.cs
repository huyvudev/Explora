using System;
using Explora.Entity;

namespace Explora.dto
{
    public class PlaneDto
    {
        public int IdPlane { get; set; }
        public int IdAirline { get; set; }
        public string PlaneName { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public int Price { get; set; }
        public int Slot { get; set; }
        public int EmptySlot { get; set; }
        public DateTime StartTime { get; set; }
        public int IsDelete { get; set; }
        public TAirline IdAirlineNavigation { get; set; } = new TAirline();
    }
}

