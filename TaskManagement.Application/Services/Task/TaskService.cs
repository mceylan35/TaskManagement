using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Application.DTOs;
using TaskManagement.Application.Interfaces.Repository.Task;
using TaskManagement.Application.Interfaces.Services.Task;
using TaskManagement.Application.Interfaces.Services.User;
using TaskManagement.Domain.Entities;
using TaskManagement.Domain.Enums;
using TaskManagement.Domain.Exceptions;

namespace TaskManagement.Application.Services.Task
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public TaskService(
            ITaskRepository taskRepository,
            IMapper mapper,
            ICurrentUserService currentUserService)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto)
        {
            var task = new TaskDomain(
                createTaskDto.Title,
                createTaskDto.Description,
                _currentUserService.UserId);

            await _taskRepository.AddAsync(task);
            return _mapper.Map<TaskDto>(task);
        }

        public async Task<List<TaskDto>> GetAllTasksAsync()
        {
            var tasks = await _taskRepository.GetAllWithUsersAsync();
            return _mapper.Map<List<TaskDto>>(tasks);
        }

        public async Task<TaskDto> GetTaskByIdAsync(Guid id)
        {
            var task = await _taskRepository.GetByIdWithUserAsync(id);
            if (task == null)
                throw new NotFoundException("Task not found");

            return _mapper.Map<TaskDto>(task);
        }

        public async Task<List<TaskDto>> GetTasksByUserIdAsync(Guid userId)
        {
            var tasks = await _taskRepository.GetByUserIdAsync(userId);
            return _mapper.Map<List<TaskDto>>(tasks);
        }

        public async Task<TaskDto> UpdateTaskAsync(UpdateTaskDto updateTaskDto)
        {
            var task = await _taskRepository.GetByIdAsync(updateTaskDto.Id);
            if (task == null)
                throw new NotFoundException("Task not found");

            // Check if the current user has permission to update the task
            if (!_currentUserService.IsAdmin && task.AssignedUserId != _currentUserService.UserId)
                throw new BadRequestException("You don't have permission to update this task");

            task.Update(updateTaskDto.Title, updateTaskDto.Description);
            task.UpdateStatus(Enum.Parse<Status>(updateTaskDto.Status));

            await _taskRepository.UpdateAsync(task);
            return _mapper.Map<TaskDto>(task);
        }

        public async System.Threading.Tasks.Task DeleteTaskAsync(Guid id)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            if (task == null)
                throw new NotFoundException("Task not found");

          
            if (!_currentUserService.IsAdmin && _currentUserService.UserId!=task.AssignedUserId)
                throw new BadRequestException("Only administrators can delete tasks");

            await _taskRepository.DeleteAsync(id);
        }
    }
}
