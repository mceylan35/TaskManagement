﻿namespace TaskManagement.API.Models
{
    public class ErrorResponse
    {
        public string Message { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
