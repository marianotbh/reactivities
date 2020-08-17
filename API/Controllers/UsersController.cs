using System.Threading.Tasks;
using Application.Users;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : AppController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await MediatR.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await MediatR.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await MediatR.Send(new CurrentUser.Query());
        }
    }
}