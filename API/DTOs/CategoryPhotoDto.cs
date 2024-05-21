namespace API.DTOs
{
    public class CategoryPhotoDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
       // public bool IsApproved { get; set; }
        public int CategoryId { get; set; }
       
    }
}