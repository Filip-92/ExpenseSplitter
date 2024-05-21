using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class UpdateToDoListContributorDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int GroupId { get; set; }
    }
}