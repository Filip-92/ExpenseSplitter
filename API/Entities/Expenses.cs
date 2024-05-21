using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Expenses")]
    public class Expenses
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string WhoPaid { get; set; }
    }
}