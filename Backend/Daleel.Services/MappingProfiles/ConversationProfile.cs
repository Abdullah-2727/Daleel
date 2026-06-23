using AutoMapper;
using Daleel.Domain.Entities;
using Daleel.Shared.DTOs.ConversationDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.MappingProfiles
{
    public class ConversationProfile : Profile
    {
        public ConversationProfile()
        {
            CreateMap<Conversation, ConversationDTO>();
        }
    }
}
