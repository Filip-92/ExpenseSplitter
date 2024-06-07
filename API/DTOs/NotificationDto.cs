using System;

namespace API.DTOs
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int GroupId { get; set; }
        public DateTime SentTime {get; set; } = DateTime.Now.AddHours(1);
        public Boolean IsRead { get; set; }
    }
}