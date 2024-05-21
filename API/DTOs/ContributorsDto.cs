using System;

namespace API.DTOs
{
    public class ContributorsDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int CategoryId { get; set; }
    }
}