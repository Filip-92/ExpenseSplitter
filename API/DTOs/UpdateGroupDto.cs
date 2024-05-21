using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class UpdateGroupDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}