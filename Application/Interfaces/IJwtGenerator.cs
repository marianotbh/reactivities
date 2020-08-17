using Persistence;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        string GenerateToken(AppUser appUser);
    }
}