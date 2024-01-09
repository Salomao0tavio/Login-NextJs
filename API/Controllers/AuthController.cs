using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    public class AuthController : ControllerBase
    {

        [HttpGet]
        [Route("/authenticated")]
        [Authorize]
        public string Authenticated() => "AUTENTICADO";

        [HttpGet]
        [Route("/user")]
        [Authorize(Roles = "USER, ADMIN")]
        public string User() => "USUARIO";

        [HttpGet]
        [Route("/admin")]
        [Authorize(Roles = "ADMIN")]
        public string Admin() => "ADMIN";

    }

}
