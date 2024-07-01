using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Explora.Entity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Cryptography;

namespace Explora.Service
{
    
	public class AuthenticationService
	{
		public string jwtToken(TUser user, IConfiguration _configuration)
		{
			
			var claim =   new List<Claim> {
                new Claim("id", user.UserId.ToString()),

                
            };
            foreach (var role in user.TRoleUsers)
            {
                claim.Add(new Claim(ClaimTypes.Role, role.Role.RoleName));
            };
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JwtSettings:Key"]));
            var token = new JwtSecurityToken(
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Audience"],
                claim,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:DurationInMinutes"])),
                signingCredentials: new SigningCredentials(key,SecurityAlgorithms.HmacSha256)
            );
            

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public string CreateRandomString(int len)
        {
            string allowed = "ABCDEFGHIJKLMONOPQRSTUVWXYZabcdefghijklmonopqrstuvwxyz0123456789";
            char[] randomChars = new char[len];

            for (int i = 0; i < len; i++)
            {
                randomChars[i] = allowed[RandomNumberGenerator.GetInt32(0, allowed.Length)];
            }

            string result = new string(randomChars);
            return (result);
        }
        
	}
}

