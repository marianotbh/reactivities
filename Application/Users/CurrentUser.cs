using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IJwtGenerator jwtGenerator;
            private readonly IUserAccessor userAccessor;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                this.userManager = userManager;
                this.jwtGenerator = jwtGenerator;
                this.userAccessor = userAccessor;

            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUserName = userAccessor.GetCurrentUserName();
                var appUser = await userManager.FindByNameAsync(currentUserName);

                return new User()
                {
                    DisplayName = appUser.DisplayName,
                    UserName = appUser.UserName,
                    Token = jwtGenerator.GenerateToken(appUser),
                    Image = null
                };
            }
        }
    }
}