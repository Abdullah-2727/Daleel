using Daleel.Domain.Entities.Identity;
using Daleel.Services.Abstraction;
using Daleel.Shared;
using Daleel.Shared.DTOs.IdentityDTOs;
using Daleel.Shared.DTOs.ValidationModelDTOs;
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
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IValidationModelService _idCardService;

        public AuthController(IAuthService authService, IValidationModelService idCardService)
        {
            _authService = authService;
            _idCardService = idCardService;
        }

        [AllowAnonymous]
        [HttpPost("register")] // POST: baseUrl/api/auth/register
        public async Task<IActionResult> Register([FromForm] RegisterDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));

                var result = await _authService.RegisterAsync(dto);
                return Ok(ApiResponse<AuthResponseDTO>.SuccessResponse(result, "User registered successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [AllowAnonymous]
        [HttpPost("id-card-scan")] // POST: baseUrl/api/auth/id-card-scan
        public async Task<IActionResult> ScanIdCard([FromForm] ScanRequestDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));

                var result = await _idCardService.ScanIdCardAsync(dto.IdCardImage);

                if (!result.IsReliable)
                    return BadRequest(ApiResponse<ScanResultDTO>.ErrorResponse(
                        $"ID card scan confidence too low. Score: {result.OverallScore}"));

                return Ok(ApiResponse<ScanResultDTO>.SuccessResponse(
                    result, "ID card scanned successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [AllowAnonymous]
        [HttpPost("login")] // POST: baseUrl/api/auth/login
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));

                var result = await _authService.LoginAsync(dto);
                return Ok(ApiResponse<AuthResponseDTO>.SuccessResponse(result, "Login successful"));
            }
            catch (Exception ex)
            {
                return Unauthorized(ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")] // POST: baseUrl/api/auth/refresh-token
        public async Task<IActionResult> RefreshToken([FromBody] string refreshToken)
        {
            try
            {
                var result = await _authService.RefreshTokenAsync(refreshToken);
                return Ok(ApiResponse<AuthResponseDTO>.SuccessResponse(result, "Token refreshed successfully"));
            }
            catch (Exception ex)
            {
                return Unauthorized(ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [AllowAnonymous]
        [HttpPost("revoke-token")] // POST: baseUrl/api/auth/revoke-token
        public async Task<IActionResult> RevokeToken([FromBody] string refreshToken)
        {
            try
            {
                await _authService.LogoutAsync(refreshToken);
                return Ok(ApiResponse<string>.SuccessResponse("", "Token revoked successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        //[Authorize]
        //[HttpPost("change-password")] // POST: baseUrl/api/auth/change-password
        //public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO dto)
        //{
        //    try
        //    {
        //        if (!ModelState.IsValid)
        //            return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));
        //
        //        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        //        await _authService.ChangePasswordAsync(userId, dto.CurrentPassword, dto.NewPassword);
        //        return Ok(ApiResponse<string>.SuccessResponse("", "Password changed successfully"));
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
        //    }
        //}

        [AllowAnonymous]
        [HttpPost("forgot-password")] // POST: baseUrl/api/auth/forgot-password
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));

                await _authService.ForgotPasswordAsync(dto);
                return Ok(ApiResponse<string>.SuccessResponse("", "OTP sent to your email"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [AllowAnonymous]
        [HttpPost("reset-password")] // POST: baseUrl/api/auth/reset-password
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));

                await _authService.ResetPasswordAsync(dto);
                return Ok(ApiResponse<string>.SuccessResponse("", "Password reset successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [AllowAnonymous]
        [HttpPost("request-otp")] // POST: baseUrl/api/auth/request-otp
        public async Task<IActionResult> RequestOtp([FromBody] RequestOtpDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));

                await _authService.RequestOtpAsync(dto);
                return Ok(ApiResponse<string>.SuccessResponse("", "OTP sent to your email"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        
        [AllowAnonymous]
        [HttpPost("verify-otp")] // POST: baseUrl/api/auth/verify-otp
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));

                var result = await _authService.VerifyOtpAsync(dto);

                if (!result)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid or expired OTP"));

                return Ok(ApiResponse<string>.SuccessResponse("", "OTP verified successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }
    }
}
