using System.Net.Mail;
using API.Models;

namespace API.Repositories
{
    public static class UserRepository
    {
        public static List<User> users = [];
        public static User? Get(String email, string password)
        {
            
           
            users.Add(new() { Name = "joao",Email =  "joao@email.com",ID = 1 , Password = "joao01", Role = "USER"});
            users.Add(new() { Name = "maria", Email = "maria@email.com", ID = 2, Password = "maria01", Role = "ADMIN" });
            users.Add(new() { Name = "ana", Email = "ana@email.com", ID = 3, Password = "ana01", Role = "USER" });

            return users.FirstOrDefault(cli =>
            cli.Email.Equals(email) &&
            cli.Password == password);
        }
    }

}
