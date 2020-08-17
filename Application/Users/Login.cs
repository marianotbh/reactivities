using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(q => q.Email).NotEmpty();
                RuleFor(q => q.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly SignInManager<AppUser> signInManager;
            private readonly IJwtGenerator jwtGenerator;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
            {
                this.jwtGenerator = jwtGenerator;
                this.userManager = userManager;
                this.signInManager = signInManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (!result.Succeeded)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                return new User
                {
                    UserName = user.UserName,
                    DisplayName = user.DisplayName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Token = jwtGenerator.GenerateToken(user)
                };
            }
        }
    }
}