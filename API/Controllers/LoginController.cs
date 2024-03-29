﻿using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Repositories;
using API.Services;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
namespace API.Controllers
{

    public class UserDTO
    {        
        public required string Email { get; set; }
        public required string Password { get; set; }        
    } 


    [ApiController]
    [Route("/v1")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        [Route("/login")]
        public ActionResult<dynamic> Authenticate([FromBody] UserDTO model)
        {
            // Recupera o usuario
            var user = UserRepository.Get(model.Email, model.Password);

            //Verifica se usuario é nulo
            if (user == null)
                return NotFound("Usuario ou senha inválidos");

            //Gera token
            var token = TokenService.GenerateToken(user);

            //Oculta senha
            user.Password = "";

            //Retorna dados
            return new
            {
                user,
                token
            };
        }

    }




}
