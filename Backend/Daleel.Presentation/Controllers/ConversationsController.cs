using Daleel.Domain.Entities;
using Daleel.Services.Abstraction;
using Daleel.Shared;
using Daleel.Shared.DTOs.ConversationDTOs;
using Daleel.Shared.DTOs.RequestDTOs;
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
    public class ConversationsController : ControllerBase
    {
        private readonly IConversationService _conversationService;

        public ConversationsController(IConversationService conversationService)
        {
            _conversationService = conversationService;
        }

        [HttpPost] // POST: baseUrl/api/conversations
        public async Task<IActionResult> StartConversation()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                var result = await _conversationService.StartConversationAsync(userId);
                return Ok(ApiResponse<ConversationDTO>.SuccessResponse(result,
                    "Conversation started successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    ApiResponse<string>.ErrorResponse(
                        ex.InnerException?.Message ?? ex.Message));
            }
        }

        [HttpPost("{id}/message")] // POST: baseUrl/api/conversations/{id}/message
        public async Task<IActionResult> SendMessage(int id, [FromBody] SendMessageDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ApiResponse<string>.ErrorResponse("Invalid data"));

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                var result = await _conversationService.SendMessageAsync(
                    id, userId, dto);

                return Ok(ApiResponse<MessageResponseDTO>.SuccessResponse(result,
                    "Message sent successfully"));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ApiResponse<string>.ErrorResponse(ex.Message));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<string>.ErrorResponse(ex.Message));
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

        [HttpPost("{id}/confirm")] // POST: baseUrl/api/conversations/{id}/confirm
        public async Task<IActionResult> ConfirmService(int id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                var result = await _conversationService.ConfirmServiceAsync(
                    id, userId);

                return Ok(ApiResponse<RequestDTO>.SuccessResponse(
                    result,
                    result.Status == RequestStatus.Completed ||
                    result.Status == RequestStatus.Processing
                        ? "Service request submitted successfully"
                        : "Service request failed"
                ));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ApiResponse<string>.ErrorResponse(ex.Message));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<string>.ErrorResponse(ex.Message));
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

        [HttpGet("{id}")] // GET: baseUrl/api/conversations/{id}
        public async Task<IActionResult> GetConversation(int id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                var result = await _conversationService.GetConversationAsync(
                    id, userId);

                return Ok(ApiResponse<ConversationDTO>.SuccessResponse(result,
                    "Conversation retrieved successfully"));
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

        [HttpGet] // GET: baseUrl/api/conversations 
        public async Task<IActionResult> GetUserConversations()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                var result = await _conversationService
                    .GetUserConversationsAsync(userId);

                return Ok(ApiResponse<IEnumerable<ConversationDTO>>.SuccessResponse(
                    result, "Conversations retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResponse(ex.Message));
            }
        }

        [HttpDelete("{id:int}")] // DELETE: baseUrl/api/conversations/{id}
        public async Task<IActionResult> DeleteConversation(int id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                await _conversationService.DeleteConversationAsync(id, userId);
                return Ok(ApiResponse<string>.SuccessResponse("",
                    "Conversation deleted successfully"));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ApiResponse<string>.ErrorResponse(ex.Message));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<string>.ErrorResponse(ex.Message));
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
    }
}
