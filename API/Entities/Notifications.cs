using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Notifications")]
    public class Notifications
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int GroupId { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public DateTime SentTime {get; set; } = DateTime.UtcNow.AddHours(1);
        public Boolean IsRead { get; set; }
    }
}