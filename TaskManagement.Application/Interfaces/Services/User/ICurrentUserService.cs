using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Application.Interfaces.Services.User
{
    public interface ICurrentUserService
    {
        Guid UserId { get; }
        string Email { get; }
        bool IsAdmin { get; }
    }
}
