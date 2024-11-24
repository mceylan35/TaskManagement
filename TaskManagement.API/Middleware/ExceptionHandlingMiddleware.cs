using TaskManagement.API.Models;
using TaskManagement.Domain.Exceptions;

namespace TaskManagement.API.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            var errorResponse = new ErrorResponse();

            switch (exception)
            {
                case NotFoundException notFoundException:
                    response.StatusCode = StatusCodes.Status404NotFound;
                    errorResponse.Message = notFoundException.Message;
                    break;

                case BadRequestException badRequestException:
                    response.StatusCode = StatusCodes.Status400BadRequest;
                    errorResponse.Message = badRequestException.Message;
                    break;

                case DomainException domainException:
                    response.StatusCode = StatusCodes.Status400BadRequest;
                    errorResponse.Message = domainException.Message;
                    break;

                default:
                    response.StatusCode = StatusCodes.Status500InternalServerError;
                    errorResponse.Message = "An error occurred while processing your request.";
                    break;
            }

            await response.WriteAsJsonAsync(errorResponse);
        }
    }
}
