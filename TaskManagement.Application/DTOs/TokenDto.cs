using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Application.DTOs
{
    public class TokenDto
    {
        public string Token { get; set; }
        public string UserId { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
       
        
    }
}
