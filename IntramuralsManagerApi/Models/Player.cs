
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;
using System;

namespace IntramuralsManagerApi.Models
{
    [BsonIgnoreExtraElements]
    public class Player
    {
        [BsonId]
        public String Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Sex { get; set; }
    }
}
