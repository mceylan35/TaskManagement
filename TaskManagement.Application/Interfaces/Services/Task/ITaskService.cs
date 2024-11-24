using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Application.DTOs;

namespace TaskManagement.Application.Interfaces.Services.Task
{
    public interface ITaskService
    {
        Task<List<TaskDto>> GetAllTasksAsync();
        Task<TaskDto> GetTaskByIdAsync(Guid id);
        Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto);
        Task<TaskDto> UpdateTaskAsync(UpdateTaskDto updateTaskDto);
        System.Threading.Tasks.Task DeleteTaskAsync(Guid id);
        Task<List<TaskDto>> GetTasksByUserIdAsync(Guid userId);
    }
}
