using Daleel.Domain.Entities;
using Daleel.Shared.DTOs.AutomationDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IAutomationService
    {
        Task ExecuteAsync(Request request, Service service, string userId/*, IEnumerable<Attachment> attachments*/);

        Task<ServiceTrackingResponseDTO> TrackResponseAsync(string serviceName, string submittedAt);
    }
}
