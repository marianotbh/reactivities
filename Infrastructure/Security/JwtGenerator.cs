using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly string jwtSecurityKey;

        public JwtGenerator(IConfiguration configuration)
        {
            jwtSecurityKey = configuration["JwtSecurityKey"];
        }

        public string GenerateToken(AppUser appUser)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, appUser.UserName)
            };

            if (string.IsNullOrWhiteSpace(jwtSecurityKey))
            {
                throw new Exception("Please configure a security key for your JWT by setting an environment variable with the key JwtSecurityKey");
            }

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecurityKey));

            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512Signature);
            var securityTokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = signingCredentials
            };

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var token = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);

            return jwtSecurityTokenHandler.WriteToken(token);
        }
    }
}