using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Domain.Exceptions;

namespace TaskManagement.Domain.ValueObjects
{
    public class TCIdentityNumber 
    {
        public string Value { get; private set; }

        private TCIdentityNumber() { } // For EF Core

        public TCIdentityNumber(string value)
        {
            if (!IsValid(value))
                throw new DomainException("Invalid TC Identity Number");

            Value = value;
        }

        public static bool IsValid(string value)
        {
            if (string.IsNullOrWhiteSpace(value) || value.Length != 11)
                return false;

            return value.All(char.IsDigit);
        }

        
    }
}
