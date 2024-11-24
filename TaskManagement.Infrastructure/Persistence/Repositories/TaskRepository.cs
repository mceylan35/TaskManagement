using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Application.Interfaces.Repository.Task;
using TaskManagement.Domain.Entities;
using TaskManagement.Infrastructure.Persistence.Context;

namespace TaskManagement.Infrastructure.Persistence.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskManagementDbContext _context;

        public TaskRepository(TaskManagementDbContext context)
        {
            _context = context;
        }

        public async Task<TaskDomain> GetByIdAsync(Guid id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<List<TaskDomain>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<List<TaskDomain>> GetByUserIdAsync(Guid userId)
        {
            return await _context.Tasks
                .Where(t => t.AssignedUserId == userId)
                .Include(t => t.AssignedUser)
                .ToListAsync();
        }

        public async Task<List<TaskDomain>> GetAllWithUsersAsync()
        {
            return await _context.Tasks
                .Include(t => t.AssignedUser)
                .ToListAsync();
        }

        public async Task<TaskDomain> GetByIdWithUserAsync(Guid id)
        {
            return await _context.Tasks
                .Include(t => t.AssignedUser)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<TaskDomain> AddAsync(TaskDomain taskDomain)
        {
            await _context.Tasks.AddAsync(taskDomain);
            await _context.SaveChangesAsync();
            return taskDomain;
        }

        public async Task UpdateAsync(TaskDomain taskDomain)
        {
            _context.Tasks.Update(taskDomain);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var taskDomain = await GetByIdAsync(id);
            if (taskDomain != null)
            {
                _context.Tasks.Remove(taskDomain);
                await _context.SaveChangesAsync();
            }
        }
    }
}
