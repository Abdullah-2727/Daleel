using Daleel.Shared.DTOs.RagDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Abstraction
{
    public interface IRagService
    {
        Task<ChatResponseDTO> ChatAsync(ChatRequestDTO request);
    }
}
