using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Domain.Common;
using TaskManagement.Domain.Enums;
using TaskManagement.Domain.ValueObjects;

namespace TaskManagement.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }
        public string TCIdentityNumber { get; private set; }
        public UserRole Role { get; private set; }
        public ICollection<TaskDomain> Tasks { get; private set; }

        private User() { } 

        public User(string firstName, string lastName, string email, string tcIdentityNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            TCIdentityNumber = tcIdentityNumber;
            Role = UserRole.User;
            Tasks = new List<TaskDomain>();
        }

        public void SetPassword(string passwordHash)
        {
            this.PasswordHash = passwordHash;
        }

        public void UpdatePersonalInfo(string firstName, string lastName)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
        }
    }
}
