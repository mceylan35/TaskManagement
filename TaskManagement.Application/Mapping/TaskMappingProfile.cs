using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Application.DTOs;
using TaskManagement.Domain.Entities;

namespace TaskManagement.Application.Mapping
{
    public class TaskMappingProfile : Profile
    {
        public TaskMappingProfile()
        {
            CreateMap<TaskDomain, TaskDto>() ;

            CreateMap<CreateTaskDto, TaskDomain>();
            CreateMap<UpdateTaskDto, TaskDomain>();
        }
    }

}
