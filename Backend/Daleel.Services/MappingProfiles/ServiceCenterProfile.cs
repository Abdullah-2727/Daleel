using AutoMapper;
using Daleel.Domain.Entities;
using Daleel.Shared.DTOs.ServiceCenterDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.MappingProfiles
{
    public class ServiceCenterProfile : Profile
    {
        public ServiceCenterProfile()
        {
            CreateMap<ServiceCenter, ServiceCenterDTO>()
                .ForMember(dest => dest.Ministry, opt => opt.MapFrom(src => src.Ministry.Name));

            CreateMap<ServiceCenter, ServiceCenterLocationDTO>();
        }
    }
}
