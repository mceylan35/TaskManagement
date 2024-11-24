using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Domain.Exceptions
{
    public class BadRequestException : DomainException
    {
        public BadRequestException() : base() { }

        public BadRequestException(string message) : base(message) { }
    }
}
