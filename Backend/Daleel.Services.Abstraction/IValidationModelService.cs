using Daleel.Shared.DTOs.ValidationModelDTOs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IValidationModelService
    {
        Task<ScanResultDTO> ScanIdCardAsync(IFormFile idCardImage);
    }
}
