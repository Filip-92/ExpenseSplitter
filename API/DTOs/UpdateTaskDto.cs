using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class UpdateTaskDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime TaskDate { get; set; }
    }
}