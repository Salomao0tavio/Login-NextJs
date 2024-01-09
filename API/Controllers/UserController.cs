using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace API.Controllers
{
    [Route("/usuario")]
    [ApiController]
    public class UserController() : ControllerBase
    {

        // GET: api/<UserController>
        [HttpGet]
        public IActionResult Get()
        {
            var users = UserRepository.users.ToList();
            return Ok(users);
        }


        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            foreach (User user in UserRepository.users)
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

            if (UserRepository.users.Any(u => u.ID == user.ID))
                return Conflict("Ja existe usuario com esse ID");

            UserRepository.users.Add(user);
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
            foreach (User user in UserRepository.users)
            {
                if (user.ID == id)
                    UserRepository.users.Remove(user);
            }
        }
    }
}
