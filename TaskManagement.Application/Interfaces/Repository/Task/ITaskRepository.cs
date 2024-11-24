

using TaskManagement.Domain.Entities;

namespace TaskManagement.Application.Interfaces.Repository.Task
{
    public interface ITaskRepository
    {
        Task<TaskDomain> GetByIdAsync(Guid id);
        Task<List<TaskDomain>> GetAllAsync();
        Task<List<TaskDomain>> GetByUserIdAsync(Guid userId);
        Task<List<TaskDomain>> GetAllWithUsersAsync();
        Task<TaskDomain> GetByIdWithUserAsync(Guid id);
        Task<TaskDomain> AddAsync(TaskDomain taskDomain);
        System.Threading.Tasks.Task UpdateAsync(TaskDomain taskDomain);
        System.Threading.Tasks.Task DeleteAsync(Guid id);
    }
}
