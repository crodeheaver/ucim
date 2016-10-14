using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using IntramuralsManagerApi.Models;
using IntramuralsManagerApi.Utility;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json;

namespace IntramuralsManagerApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        IUserRepository Users;

        public AuthController(IUserRepository users)
        {
            Users = users;
        }

        [HttpPost("register")]
        public string Register(string username, string password)
        {
            User user = new User { username = username, salt = Guid.NewGuid().ToString().Replace("-","") };
            try
            {
                user.password = UserUtil.HashPassword(password, user.salt);
                Users.Add(user);
            }
            catch(Exception ex)
            {
                throw ex;
            }

            return UserUtil.GenerateJwt(username);
        }
    }
}
