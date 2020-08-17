using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class AppController : ControllerBase
    {
        private IMediator mediator;

        protected IMediator MediatR => mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}