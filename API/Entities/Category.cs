using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Category")]
    public class Category
    {
        // Category
        public Category() {
            Expenses = new List<Expenses>();
            Contributors = new List<Contributors>();
            Spendings = new List<Spendings>();
            CategoryPhotos = new List<CategoryPhoto>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Currency { get; set;}
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public bool IsClosed { get; set; }
        public ICollection<Expenses> Expenses { get; set; }
        public ICollection<Contributors> Contributors { get; set; }
        public ICollection<Spendings> Spendings { get; set; }
        public ICollection<CategoryPhoto> CategoryPhotos { get; set; }
    }
}