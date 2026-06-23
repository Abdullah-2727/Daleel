using AutoMapper;
using Daleel.Domain.Entities;
using Daleel.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.MappingProfiles
{
    public class MinistryProfile : Profile
    {
        public MinistryProfile()
        {
            CreateMap<Ministry, MinistryDTO>();
        }
    }
}
