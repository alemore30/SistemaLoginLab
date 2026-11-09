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

        // Demo credential validation
        if (request.Username == "admin" && request.Password == "password123")
        {
            return Ok(new LoginResponse
            {
                Success = true,
                Message = "Authentication successful.",
                Token = "demo-jwt-token-xyz123",
                Username = request.Username
            });
        }

        return Unauthorized(new LoginResponse
        {
            Success = false,
            Message = "Invalid credentials. Try 'admin' / 'password123'."
        });
    }
}
