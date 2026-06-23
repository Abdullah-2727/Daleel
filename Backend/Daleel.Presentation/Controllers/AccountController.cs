using Daleel.Services.Abstraction;
using Daleel.Shared;
using Daleel.Shared.DTOs.IdentityDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Daleel.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("profile")] // GET: baseUrl/api/account/profile
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                var result = await _accountService.GetProfileAsync(userId);
                return Ok(ApiResponse<UserDTO>.SuccessResponse(result,
                    "Profile retrieved successfully"));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ApiResponse<string>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [HttpPost("change-password")] // POST: baseUrl/api/account/change-password
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                await _accountService.ChangePasswordAsync(
                    userId, dto.CurrentPassword, dto.NewPassword);

                return Ok(ApiResponse<string>.SuccessResponse("",
                    "Password changed successfully"));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ApiResponse<string>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [HttpDelete] // DELETE: baseUrl/api/account
        public async Task<IActionResult> DeleteAccount()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                await _accountService.DeleteAccountAsync(userId);
                return Ok(ApiResponse<string>.SuccessResponse("",
                    "Account deleted successfully"));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ApiResponse<string>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }
    }
}
