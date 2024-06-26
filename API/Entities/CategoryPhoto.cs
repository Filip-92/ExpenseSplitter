using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("CategoryPhoto")]
    public class CategoryPhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
      //  public bool IsApproved { get; set; }
        public string PublicId { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public int CategoryId { get; set; }
    }
}