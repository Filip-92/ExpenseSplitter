using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("ToDoListContributors")]
    public class ToDoListContributors
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int GroupId { get; set; }
    }
}