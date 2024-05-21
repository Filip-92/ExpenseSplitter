using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public bool IsClosed { get; set; }
    }
}