using AutoMapper;
using Daleel.Domain.Entities;
using Daleel.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.MappingProfiles
{
    public class ServiceProfile : Profile
    {
        public ServiceProfile()
        {
            CreateMap<Service, ServiceDTO>()
                .ForMember(dest => dest.Ministry, opt => opt.MapFrom(src => src.Ministry.Name));
        }
    }
}
