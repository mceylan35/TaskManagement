using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Application.Interfaces.Repository.Task;
using TaskManagement.Application.Interfaces.Repository.User;
using TaskManagement.Application.Interfaces.Services.Task;
using TaskManagement.Application.Interfaces.Services.User;
using TaskManagement.Application.Services.Authentication;
using TaskManagement.Application.Services.Task;
using TaskManagement.Application.Services.User;
using TaskManagement.Infrastructure.Authentication;
using TaskManagement.Infrastructure.Persistence.Context;
using TaskManagement.Infrastructure.Persistence.Repositories;

namespace TaskManagement.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services , IConfiguration configuration)
        {
            services.AddDbContext<TaskManagementDbContext>(options =>
           options.UseSqlServer(
               configuration.GetConnectionString("DefaultConnection"),
               b => b.MigrationsAssembly(typeof(TaskManagementDbContext).Assembly.FullName)));

            services.AddScoped<IPasswordHasher, PasswordHasher>();
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
             
          

            services.AddScoped<ITaskRepository, TaskRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<IUserService, UserService>();
            return services;
        }
    }
}
