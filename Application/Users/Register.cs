using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email)
                    .NotEmpty()
                    .EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext dataContext;
            private readonly UserManager<AppUser> userManager;
            private readonly IJwtGenerator jwtGenerator;

            public Handler(DataContext dataContext, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                this.dataContext = dataContext;
                this.userManager = userManager;
                this.jwtGenerator = jwtGenerator;

            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await dataContext.Users.AnyAsync(x => x.Email == request.Email))
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                if (await dataContext.Users.AnyAsync(x => x.UserName == request.UserName))
                    throw new RestException(HttpStatusCode.BadRequest, new { UserName = "UserName already exists" });

                var appUser = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.UserName
                };

                var result = await userManager.CreateAsync(appUser, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = appUser.DisplayName,
                        Token = jwtGenerator.GenerateToken(appUser),
                        UserName = appUser.UserName,
                        Image = null
                    };
                }

                throw new System.Exception("Problem creating user");
            }
        }
    }
}