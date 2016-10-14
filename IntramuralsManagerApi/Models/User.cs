namespace IntramuralsManagerApi.Models
{
    public class User
    {
        public string Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string salt { get; set; }
    }
}
