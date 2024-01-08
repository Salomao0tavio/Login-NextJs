﻿using Microsoft.AspNetCore.Mvc;
using AuthApi.Models;
using AuthApi.Repositories;
using AuthApi.Services;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
namespace AuthApi.Controllers
{

    public class UserDTO
    {        
        public required string Name { get; set; }
        public required string Password { get; set; }        
    } 


    [ApiController]
    [Route("/v1")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        [Route("/login")]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] UserDTO model)
            {
            // Recupera o usuario
            var user = UserRepository.Get(model.Name, model.Password);

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