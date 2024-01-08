using AuthApi.Models;
using AuthApi.Repositories;
using AuthAPI.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(UserDbContext context) : ControllerBase
    {

        // GET: api/<UserController>
        [HttpGet]
        public IActionResult Get()
        {
            var users = context.Users.ToList();
            return Ok(users);
        }


        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            foreach (User user in context.Users)
            {
                if (user.ID == id)
                    return user;
            }
            throw new Exception("Nao encontrado usuario com este ID");
        }

        // POST api/<UserController>
        [HttpPost]
        public IActionResult Post(User user)
        {
            if (user == null)
                return BadRequest("Dados invalidos");

            if (context.Users.Any(u => u.ID == user.ID))
                return Conflict("Ja existe usuario com esse ID");

            context.Users.Add(user);
            return Created();
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, User _user)
        {
            if (_user is null)
            {
                throw new ArgumentNullException(nameof(_user));
            }

            User user = Get(id);
            _user = user;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            foreach (User user in context.Users)
            {
                if (user.ID == id)
                    context.Users.Remove(user);
            }
        }
    }
}
