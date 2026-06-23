using Daleel.Domain.Entities;
using Daleel.Services.Abstraction;
using Daleel.Shared;
using Daleel.Shared.DTOs.RequestDTOs;
using Daleel.Shared.QueryParams;
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
    public class RequestsController : ControllerBase
    {
        private readonly IRequestService _requestService;

        public RequestsController(IRequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpGet] // GET: baseUrl/api/requests
        public async Task<IActionResult> GetUserRequests([FromQuery] RequestQueryParams requestQueryParams)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                var result = await _requestService.GetUserRequestsAsync(userId, requestQueryParams);
                return Ok(ApiResponse<PaginatedResult<RequestDTO>>.SuccessResponse(
                    result, "Requests retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [HttpGet("{id}")] // GET: baseUrl/api/requests/{id}
        public async Task<IActionResult> GetRequest(int id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                var result = await _requestService.GetRequestAsync(id, userId);

                return Ok(ApiResponse<RequestDTO>.SuccessResponse(
                    result, "Request retrieved successfully"));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ApiResponse<string>.ErrorResponse(ex.Message));
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [HttpGet("{id:int}/response")] // GET: baseUrl/api/requests/{id}/response
        public async Task<IActionResult> GetResponse(int id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                var result = await _requestService.GetResponseAsync(id, userId);

                if (result == null)
                    return Ok(ApiResponse<string>.SuccessResponse("",
                        "Response not ready yet, check back later"));

                return Ok(ApiResponse<ResponseDTO>.SuccessResponse(
                    result, "Response retrieved successfully"));
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
