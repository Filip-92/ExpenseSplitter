using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class UpdateExpensesContributorDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int CategoryId { get; set; }
    }
}