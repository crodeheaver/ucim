using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntramuralsManagerApi.Models
{
    public interface IUserRepository
    {
        void Add(User user);
        IEnumerable<User> GetAll();
        User Find(string Id);
        bool Remove(string Id);
        void Update(User user);
    }
}
