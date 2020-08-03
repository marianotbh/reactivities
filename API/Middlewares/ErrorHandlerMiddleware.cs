using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger)
        {
            this.next = next;
            this.logger = logger;
        }

        private readonly RequestDelegate next;
        private readonly ILogger<ErrorHandlerMiddleware> logger;

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await next(httpContext);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(httpContext, e, logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext httpContext, Exception exception, ILogger<ErrorHandlerMiddleware> logger)
        {
            object errors = null;

            switch (exception)
            {
                case RestException restException:
                    logger.LogError(exception, "REST ERROR");
                    errors = restException.Errors;
                    httpContext.Response.StatusCode = (int)restException.Code;
                    break;
                case Exception e:
                    logger.LogError(exception, "SERVER ERROR");
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            httpContext.Response.ContentType = "application/json";

            if (errors != null)
            {
                var result = JsonSerializer.Serialize(new
                {
                    errors
                });

                await httpContext.Response.WriteAsync(result);
            }
        }
    }

    public static partial class ApplicationBuilderExtender
    {
        public static void UseErrorHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ErrorHandlerMiddleware>();
        }
    }
}