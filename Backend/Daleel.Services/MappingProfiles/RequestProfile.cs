using AutoMapper;
using Daleel.Domain.Entities;
using Daleel.Shared.DTOs.RequestDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.MappingProfiles
{
    public class RequestProfile : Profile
    {
        public RequestProfile()
        {
            CreateMap<Request, RequestDTO>()
                .ForMember(dest => dest.ServiceName,
                    opt => opt.MapFrom(src => src.Service.Name))
                .ForMember(dest => dest.Response,
                    opt => opt.MapFrom(src => src.Response));

            CreateMap<Response, ResponseDTO>();
        }
    }
}
