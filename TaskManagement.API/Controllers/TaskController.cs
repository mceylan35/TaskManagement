using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Application.DTOs;
using TaskManagement.Application.Interfaces.Services.Task;
using TaskManagement.Application.Interfaces.Services.User;

namespace TaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly ICurrentUserService _currentUserService;

        public TaskController(ITaskService taskService, ICurrentUserService currentUserService)
        {
            _taskService = taskService;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskDto>>> GetAll()
        {
            if (_currentUserService.IsAdmin)
            {
                var tasks = await _taskService.GetAllTasksAsync();
                return Ok(tasks);
            }

            var userTasks = await _taskService.GetTasksByUserIdAsync(_currentUserService.UserId);
            return Ok(userTasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetById(Guid id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);

            if (!_currentUserService.IsAdmin && task.AssignedUserId != _currentUserService.UserId)
                return Forbid();

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> Create(CreateTaskDto createTaskDto)
        {
            var task = await _taskService.CreateTaskAsync(createTaskDto);
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TaskDto>> Update(Guid id, UpdateTaskDto updateTaskDto)
        {
            if (id != updateTaskDto.Id)
                return BadRequest();

            var existingTask = await _taskService.GetTaskByIdAsync(id);
            if (!_currentUserService.IsAdmin && existingTask.AssignedUserId != _currentUserService.UserId)
                return Forbid();

            var task = await _taskService.UpdateTaskAsync(updateTaskDto);
            return Ok(task);
        }

        [HttpDelete("{id}")]
       // [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await _taskService.DeleteTaskAsync(id);
            return Ok(true);
        }
    }
}
