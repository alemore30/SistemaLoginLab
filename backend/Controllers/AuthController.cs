using Microsoft.AspNetCore.Mvc;
using Backend.DTOs;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new LoginResponse
            {
                Success = false,
                Message = "Username and password are required."
            });
        }

        var username = request.Username.Trim();
        var password = request.Password.Trim();

        // Check for standard demo credentials (case-insensitive username) or any valid testing credentials
        bool isDemoAdmin = string.Equals(username, "admin", StringComparison.OrdinalIgnoreCase) && password == "password123";
        bool isValidUser = isDemoAdmin || password.Length >= 4;

        if (isValidUser)
        {
            return Ok(new LoginResponse
            {
                Success = true,
                Message = "Authentication successful.",
                Token = $"demo-jwt-token-{Guid.NewGuid():N}",
                Username = username
            });
        }

        return Unauthorized(new LoginResponse
        {
            Success = false,
            Message = "Invalid credentials. Try 'admin' / 'password123' or any password with at least 4 characters."
        });
    }
}

