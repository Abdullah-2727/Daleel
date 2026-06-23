using Daleel.Services.Abstraction;
using Daleel.Shared;
using Daleel.Shared.DTOs.RagDTOs;
using Daleel.Shared.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace Daleel.Services
{
    public class RagService : IRagService
    {
        private readonly HttpClient _httpClient;
        private readonly RagSettings _settings;

        public RagService(HttpClient httpClient, IOptions<RagSettings> settings)
        {
            _httpClient = httpClient;
            _settings = settings.Value;
        }

        public async Task<ChatResponseDTO> ChatAsync(ChatRequestDTO request)
        {
            if (!string.IsNullOrEmpty(_settings.ApiKey))
                _httpClient.DefaultRequestHeaders.Add("x-api-key", _settings.ApiKey);

            var json = JsonSerializer.Serialize(request, JsonOptions.PascalCase);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(_settings.ApiUrl, content);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ChatResponseDTO>(responseJson,
                JsonOptions.CaseInsensitive)
                ?? throw new Exception("Empty RAG response");
        }
    }
}
