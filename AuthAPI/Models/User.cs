using Microsoft.AspNetCore.Identity;

namespace AuthApi.Models
{
    public class User
    {
        public int? ID { get; set; }
        public required string Name { get; set; }
        public string? Email { get; set; }
        public required string Password { get; set; }
        public string? Role { get; set; }
            
        public void Cliente(string name, string email, int? id, string password, string role)
        {
            Name = name;
            Email = email;
            ID = id;
            Password = password;
        }
    }
}
