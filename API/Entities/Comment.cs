using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Comment")]
    public class Comment
    {
        // Category
        public int Id { get; set; }
        public string Content { get; set; }
        public string Username { get; set; }
        public int TaskId { get; set; }
        public DateTime Uploaded { get; set; }
    }
}