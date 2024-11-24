﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Application.Services.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(Domain.Entities.User user);
    }
}
