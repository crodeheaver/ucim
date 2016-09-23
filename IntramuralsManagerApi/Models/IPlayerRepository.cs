using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntramuralsManagerApi.Models
{
    public interface IPlayerRepository
    {
        void Add(Player player);
        IEnumerable<Player> GetAll();
        Player Find(string Id);
        bool Remove(string Id);
        void Update(Player player);
    }
}
