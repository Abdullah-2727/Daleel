using Daleel.Services.Abstraction;
using Daleel.Shared;
using Daleel.Shared.DTOs.ValidationModelDTOs;
using Daleel.Shared.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Daleel.Services
{
    public class ValidationModelService : IValidationModelService
    {
        private readonly HttpClient _httpClient;
        private readonly ValidationModelSettings _settings;

        public ValidationModelService(HttpClient httpClient, IOptions<ValidationModelSettings> settings)
        {
            _httpClient = httpClient;
            _settings = settings.Value;
        }

        public async Task<ScanResultDTO> ScanIdCardAsync(IFormFile idCardImage)
        {
            var response = await ScanAsync(idCardImage);
            return BuildResult(response);
        }

        private async Task<ScanResponseDTO> ScanAsync(IFormFile idCardImage)
        {
            using var content = new MultipartFormDataContent();
            await using var stream = idCardImage.OpenReadStream();
            var fileContent = new StreamContent(stream);
            fileContent.Headers.ContentType =
                new MediaTypeHeaderValue(idCardImage.ContentType);
            content.Add(fileContent, "file", idCardImage.FileName);

            var response = await _httpClient.PostAsync(_settings.ModelApiUrl, content);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ScanResponseDTO>(json,
                JsonOptions.CaseInsensitive)!;
        }

        private ScanResultDTO BuildResult(ScanResponseDTO response)
        {
            var ocr = response.Ocr;
            var val = response.Validation;
        
            double overallScore =
                val.IdCard * _settings.IdCardWeight +
                val.NationalId * _settings.NationalIdWeight +
                val.FullName * _settings.FullNameWeight +
                val.DateOfBirth * _settings.DateOfBirthWeight +
                val.Address * _settings.AddressWeight;
        
            var criticalValid =
                val.IdCard >= _settings.IdCardMinConfidence &&
                val.NationalId >= _settings.NationalIdMinConfidence;
        
            var isReliable = criticalValid && overallScore >= _settings.MinOverallScore;
        
            DateOnly dateOfBirth;
            if (!DateOnly.TryParseExact(
                ocr.DateOfBirth,
                "yyyy/MM/dd",
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None,
                out dateOfBirth))
            {
                dateOfBirth = DateOnly.MinValue;
            }
        
            return new ScanResultDTO
            {
                IsReliable = isReliable,
                OverallScore = Math.Round(overallScore, 2),

                FullName = ocr.FullName,
                NationalId = ocr.NationalId,
                DateOfBirth = dateOfBirth,
                Address = ocr.Address
            };
        }
    }
}



