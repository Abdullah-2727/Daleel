using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Services.Abstraction;
using Daleel.Shared;
using Daleel.Shared.DTOs.AutomationDTOs;
using Daleel.Shared.Settings;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace Daleel.Services
{
    public class AutomationService : IAutomationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly HttpClient _httpClient;
        private readonly AutomationSettings _settings;

        public AutomationService(IUnitOfWork unitOfWork, HttpClient httpClient, IOptions<AutomationSettings> settings)
        {
            _unitOfWork = unitOfWork;
            _httpClient = httpClient;
            _settings = settings.Value;
        }

        public async Task ExecuteAsync(Request request, Service service, string userId/*, IEnumerable<Attachment> attachments*/)
        {
            try
            {
                // Update request (Processing)
                request.Status = RequestStatus.Processing;
                request.UpdatedAt = DateTime.UtcNow;
                _unitOfWork.GetRepository<Request, int>().Update(request);
                await _unitOfWork.SaveChangesAsync();

                // Build payload
                var payload = new ServiceExecutionRequestDTO
                {
                    ServiceName = service.Name,
                    RequestData = request.RequestData,
                    ///Attachments = attachments.Select(a => new AttachmentInfoDTO
                    ///{
                    ///    FileName = a.FileName,
                    ///    FileUrl = a.FileUrl
                    ///}).ToList()
                };

                // Call Automation
                var result = await ExecuteServiceAsync(payload);

                if (result.Success)
                {
                    // Store DigitalEgyptRequestCreatedAt from response
                    request.CreatedAtOnDEP = result.SubmittedAt;

                    // Content has value → immediate response
                    if (!string.IsNullOrEmpty(result.Content))
                    {
                        request.Status = RequestStatus.Completed;
                        await SaveResponseAsync(request.Id, result.Content);
                    }
                    // Content null → service done but response not ready yet
                    // stays Processing until tracked
                }
                else
                {
                    // Failed
                    request.Status = RequestStatus.Failed;
                    request.Note = ""; // Until we get error message
                }
            }
            catch (Exception ex)
            {
                request.Status = RequestStatus.Failed;
                request.Note = $"Automation error: {ex.Message}";
            }
            finally
            {
                request.UpdatedAt = DateTime.UtcNow;
                _unitOfWork.GetRepository<Request, int>().Update(request);
                await _unitOfWork.SaveChangesAsync();
            }
        }

        public async Task<ServiceTrackingResponseDTO> TrackResponseAsync(string serviceName, string submittedAt)
        {
            if (!string.IsNullOrEmpty(_settings.ApiKey))
                _httpClient.DefaultRequestHeaders.Add("x-api-key", _settings.ApiKey);

            var json = JsonSerializer.Serialize(new ServiceTrackingRequestDTO
                {
                    ServiceName = serviceName,
                    SubmittedAt = submittedAt
                }, JsonOptions.PascalCase);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(_settings.TrackingApiUrl, content);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ServiceTrackingResponseDTO>(responseJson,
                JsonOptions.CaseInsensitive)
                ?? throw new Exception("Empty tracking response");
        }

        private async Task<ServiceExecutionResponseDTO> ExecuteServiceAsync(ServiceExecutionRequestDTO payload)
        {
            if (!string.IsNullOrEmpty(_settings.ApiKey))
                _httpClient.DefaultRequestHeaders.Add("x-api-key", _settings.ApiKey);
            
            var json = JsonSerializer.Serialize(payload, JsonOptions.PascalCase);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(_settings.ExecuteApiUrl, content);
            response.EnsureSuccessStatusCode();
            
            var responseJson = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ServiceExecutionResponseDTO>(responseJson,
                JsonOptions.CaseInsensitive)
                ?? throw new Exception("Empty execution response");  
        }

        private async Task SaveResponseAsync(int requestId, string content)
        {
            var response = new Response
            {
                RequestId = requestId,
                Content = content,
                ReceivedAt = DateTime.UtcNow
            };

            await _unitOfWork.GetRepository<Response, int>()
                .CreateAsync(response);
        }
    }
}
