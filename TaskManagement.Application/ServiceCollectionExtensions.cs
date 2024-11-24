using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Application.Behaviors;
using TaskManagement.Application.Interfaces.Services.Task;
using TaskManagement.Application.Interfaces.Services.User;
using TaskManagement.Application.Mapping;
using TaskManagement.Application.Services.Task;
using TaskManagement.Application.Services.User;

namespace TaskManagement.Application
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        { 
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
             
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
             
             
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
             
            services.AddAutoMapper(cfg =>
            {
                cfg.AddMaps(Assembly.GetExecutingAssembly());
                cfg.AddProfile<TaskMappingProfile>();
                cfg.AddProfile<UserMappingProfile>();
            });

            return services;
        }
    }
}
