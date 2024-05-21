using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("TasksGroup")]
    public class TasksGroup
    {
        // Category
        public TasksGroup() {
            Contributors = new List<Contributors>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public bool IsClosed { get; set; }
        public ICollection<Contributors> Contributors { get; set; }
    }
}