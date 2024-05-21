using System;

namespace API.DTOs
{
    public class ExpensesDto
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string WhoPaid { get; set; }
    }
}