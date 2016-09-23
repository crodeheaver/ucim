using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntramuralsManagerApi.DAL
{
    public static class MongoConnection
    {
        public static IMongoClient client = new MongoClient();
        public static IMongoDatabase database = client.GetDatabase("im");
    }
}
