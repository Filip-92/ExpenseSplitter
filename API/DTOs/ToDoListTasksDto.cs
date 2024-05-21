using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class ToDoListTasksDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime TaskDate { get; set; }
        public string Username { get; set; }
        public bool IsDone { get; set; }
        public int? GroupId { get; set; }
    }
}