using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using API.DTOs;

namespace API.Entities
{
    [Table("ToDoListTasks")]
    public class ToDoListTasks
    {
        public ToDoListTasks()
        {
            Comments = new List<Comment>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime TaskDate { get; set; }
        public string Username { get; set; }
        public bool IsDone { get; set; }
        public int? GroupId { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}