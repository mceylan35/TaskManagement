using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Application.DTOs;
using TaskManagement.Application.Interfaces.Repository.User;
using TaskManagement.Application.Interfaces.Services.User;
using TaskManagement.Application.Services.Authentication;
using TaskManagement.Domain.Exceptions;
using TaskManagement.Domain.ValueObjects;

namespace TaskManagement.Application.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IPasswordHasher _passwordHasher;

        public UserService(
            IUserRepository userRepository,
            IMapper mapper,
            IJwtTokenGenerator jwtTokenGenerator,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtTokenGenerator = jwtTokenGenerator;
            _passwordHasher = passwordHasher;
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto createUserDto)
        {
            var existingUser = await _userRepository.GetByEmailAsync(createUserDto.Email);
            if (existingUser != null)
                throw new BadRequestException("Email already exists");

            var tcIdentityNumber =createUserDto.TCIdentityNumber;
            var existingTcUser = await _userRepository.GetByTCIdentityNumberAsync(createUserDto.TCIdentityNumber);
            if (existingTcUser != null)
                throw new BadRequestException("TCNumber already exists");
            


            var user = new Domain.Entities.User(
                createUserDto.FirstName,
                createUserDto.LastName,
                createUserDto.Email,
                tcIdentityNumber);

            user.SetPassword(_passwordHasher.HashPassword(createUserDto.Password));

            await _userRepository.AddAsync(user);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetUserByIdAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                throw new NotFoundException("User not found");

            return _mapper.Map<UserDto>(user);
        }

        

        public async Task<TokenDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetByEmailAsync(loginDto.Email);
            if (user == null)
                throw new BadRequestException("Invalid email or password");

            if (!_passwordHasher.VerifyPassword(loginDto.Password, user.PasswordHash))
                throw new BadRequestException("Invalid email or password");

            var token = _jwtTokenGenerator.GenerateToken(user);

            return new TokenDto
            {
                Token = token,
                ExpirationDate = DateTime.UtcNow.AddHours(24),
                UserId=user.Id.ToString(),
                Email=user.Email,
                IsAdmin=user.Role== Domain.Enums.UserRole.Admin?true:false
            };
        }

         
    }
}
