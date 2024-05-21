using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Contributors")]
    public class Contributors
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int CategoryId { get; set; }
    }
}