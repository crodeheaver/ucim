using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using IntramuralsManagerApi.DAL;

namespace IntramuralsManagerApi.Models
{
    public class PlayerRepository : IPlayerRepository
    {
        protected static IMongoCollection<Player> _players;

        public PlayerRepository()
        {
                _players = MongoConnection.database.GetCollection<Player>("player");
        }

        public void Add(Player player)
        {
            _players.InsertOne(player);
            return;
        }

        public Player Find(string Id)
        {
            return _players.Find(new BsonDocument("id", Id)).FirstOrDefault();
        }

        public IEnumerable<Player> GetAll()
        {
            return _players.Find(new BsonDocument()).ToList();
        }

        public bool Remove(string Id)
        {
            var result = _players.DeleteOne(new BsonDocument("_id", Id));
            return result.IsAcknowledged;
        }

        public void Update(Player player)
        {
            _players.ReplaceOne(new BsonDocument("_id", player.Id), player);
            return;
        }
    }
}
