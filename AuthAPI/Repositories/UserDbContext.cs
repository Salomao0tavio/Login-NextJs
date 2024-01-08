using AuthApi.Models;

namespace AuthAPI.Repositories
{
    public class UserDbContext
    {
        public List<User> Users;

        public UserDbContext() => Users = [];

        
    }
}
