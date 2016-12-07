using Microsoft.AspNetCore.Mvc;
using IntramuralsManagerApi.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Bson;
using System;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace IntramuralsManagerApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        public IUserRepository Users { get; set; }
        public UserController(IUserRepository users)
        {
            Users = users;
        }
        
        [HttpGet]
        public IEnumerable<User> GetAll()
        {  
            return Users.GetAll();
        }
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(string id)
        {
            var user = Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            return new ObjectResult(user);
        }

        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            Users.Add(user);
            return CreatedAtRoute("GetPlayer", new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult Update(String id, [FromBody] User user)
        {
            if (user == null || user.Id != id)
            {
                return BadRequest();
            }

            var tUser = Users.Find(id.ToString());
            if (tUser == null)
            {
                return NotFound();
            }

            Users.Update(user);
            return new NoContentResult();
        }

        [HttpPatch("{id}")]
        public IActionResult Update([FromBody] User user, string id)
        {
            if (user == null)
            {
                return BadRequest();
            }

            var todo = Users.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            user.Id = todo.Id;

            Users.Update(user);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var user = Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            Users.Remove(id);
            return new NoContentResult();
        }
    }
}
