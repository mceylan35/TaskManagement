using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Domain.Common;
using TaskManagement.Domain.Enums;

namespace TaskManagement.Domain.Entities
{
    public class TaskDomain : BaseEntity
    {
        public string Title { get; private set; }
        public string Description { get; private set; }
        public Status Status { get; private set; }
        public Guid AssignedUserId { get; private set; }
        public virtual User AssignedUser { get; private set; }

        private TaskDomain() { } 

        public TaskDomain(string title, string description, Guid assignedUserId)
        {
            Title = title;
            Description = description;
            AssignedUserId = assignedUserId;
            Status = Status.NotStarted;
        }

        public void UpdateStatus(Status newStatus)
        {
            Status = newStatus;
            ModifiedDate = DateTime.UtcNow;
        }

        public void Update(string title, string description)
        {
            Title = title;
            Description = description;
            ModifiedDate = DateTime.UtcNow;
        }
    }
}
