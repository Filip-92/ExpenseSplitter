using System;

namespace API.DTOs
{
    public class ToDoListContributorsDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int GroupId { get; set; }
    }
}