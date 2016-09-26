using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.AspNetCore.Authorization;
using IntramuralsManagerApi.Mongo;

namespace IntramuralsManagerApi.Models
{
    public class UserRepository : IUserRepository
    {
        protected static IMongoCollection<User> _users;

        public UserRepository()
        {
                _users = MongoConnection.database.GetCollection<User>("user");
        }

        public void Add(User user)
        {
            _users.InsertOne(user);
            return;
        }

        public User Find(string Id)
        {
            return _users.Find(new BsonDocument("_id", Id)).FirstOrDefault();
        }

        public User FindByUsername(string Username)
        {
            return _users.Find(new BsonDocument("username", Username)).FirstOrDefault();
        }

        public IEnumerable<User> GetAll()
        {
            return _users.Find(new BsonDocument()).ToList();
        }

        public bool Remove(string Id)
        {
            var result = _users.DeleteOne(new BsonDocument("_id", Id));
            return result.IsAcknowledged;
        }

        public void Update(User user)
        {
            _users.ReplaceOne(new BsonDocument("_id", user.Id), user);
            return;
        }
    }
}
