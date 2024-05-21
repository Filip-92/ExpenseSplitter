using System;

namespace API.DTOs
{
    public class SpendingsDto
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public int ExpenseId { get; set; }
        public int CategoryId { get; set; }
        public string WhoPaid { get; set; }
        public string WhoOwes { get; set; }
    }
}