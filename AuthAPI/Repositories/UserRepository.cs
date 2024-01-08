using AuthApi.Models;

namespace AuthApi.Repositories
{
    public static class UserRepository
    {

        public static User? Get(string name, string password)
        {
            var clientes = new List<User>
            {
            new() { Name = "joao",Email =  "joao@email.com",ID = 1 , Password = "joao01", Role = "USER"},
            new() { Name = "maria", Email = "maria@email.com", ID = 2, Password = "maria01", Role = "ADMIN" },
            new() { Name = "ana", Email = "ana@email.com", ID = 3, Password = "ana01", Role = "USER" }
            };


            return clientes.FirstOrDefault(cli =>
            cli.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase) &&
            cli.Password == password);
        }
    }

}
