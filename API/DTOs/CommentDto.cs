using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Username { get; set; }
        public int TaskId { get; set; }
        public DateTime Uploaded { get; set; }
    }
}