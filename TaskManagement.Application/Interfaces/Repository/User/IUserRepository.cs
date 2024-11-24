using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Application.Interfaces.Repository.User
{
    public interface IUserRepository
    {
        Task<Domain.Entities.User> GetByIdAsync(Guid id);
      
        Task<Domain.Entities.User> GetByEmailAsync(string email);
        Task<Domain.Entities.User> GetByTCIdentityNumberAsync(string tcIdentityNumber);
        Task<bool> ExistsAsync(string email);
        Task<Domain.Entities.User> AddAsync(Domain.Entities.User user);
       
      
    }
}
