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
    public class PlayerController : Controller
    {
        public IPlayerRepository Players { get; set; }
        public PlayerController(IPlayerRepository players)
        {
            Players = players;
        }
        
        [HttpGet]
        public IEnumerable<Player> GetAll()
        {  
            return Players.GetAll();
        }
        [HttpGet("{id}", Name = "GetPlayer")]
        public IActionResult GetById(string id)
        {
            var player = Players.Find(id);
            if (player == null)
            {
                return NotFound();
            }
            return new ObjectResult(player);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Player player)
        {
            if (player == null)
            {
                return BadRequest();
            }
            Players.Add(player);
            return CreatedAtRoute("GetPlayer", new { id = player.Id }, player);
        }

        [HttpPut("{id}")]
        public IActionResult Update(String id, [FromBody] Player player)
        {
            if (player == null || player.Id != id)
            {
                return BadRequest();
            }

            var tPlayer = Players.Find(id.ToString());
            if (tPlayer == null)
            {
                return NotFound();
            }

            Players.Update(player);
            return new NoContentResult();
        }

        [HttpPatch("{id}")]
        public IActionResult Update([FromBody] Player player, string id)
        {
            if (player == null)
            {
                return BadRequest();
            }

            var todo = Players.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            player.Id = todo.Id;

            Players.Update(player);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var player = Players.Find(id);
            if (player == null)
            {
                return NotFound();
            }

            Players.Remove(id);
            return new NoContentResult();
        }
    }
}
