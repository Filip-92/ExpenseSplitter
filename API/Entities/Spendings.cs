using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Spendings")]
    public class Spendings
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public int ExpenseId { get; set; }
        public int CategoryId { get; set; }
        public string WhoPaid { get; set; }
        public string WhoOwes { get; set; }
    }
}