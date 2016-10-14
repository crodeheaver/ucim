using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json;
using IntramuralsManagerApi.Models;
using IntramuralsManagerApi.Utility;

namespace IntramuralsManagerApi
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class TokenProviderMiddleware
    {
        private readonly RequestDelegate _next;
        private UserRepository Users;

        public TokenProviderMiddleware(
            RequestDelegate next)
        {
            _next = next;
            Users = new UserRepository();
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Equals(UserUtil.options.Path, StringComparison.Ordinal))
            {
                return _next(context);
            }

            // Request must be POST with Content-Type: application/x-www-form-urlencoded
            if (!context.Request.Method.Equals("POST")
               || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }

            return GenerateToken(context);
        }
        private async Task GenerateToken(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];

            var identity = await GetIdentity(username, password);
            if (identity == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;

            // Specifically add the jti (random nonce), iat (issued timestamp), and sub (subject/user) claims.
            // You can add other claims here, if you want:

            string response = UserUtil.GenerateJwt(username);
            // Serialize and return the response
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(response);
        }

        private Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            try
            {
                User user = Users.FindByUsername(username);
                if (user != null)
                {
                    string hashPass = UserUtil.HashPassword(password, user.salt);
                    if (user.password == hashPass)
                    {
                        return Task.FromResult(new ClaimsIdentity(new System.Security.Principal.GenericIdentity(username, "Token"), new Claim[] { }));
                    }
                }
            }
            catch (Exception ex) { }

            return Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
