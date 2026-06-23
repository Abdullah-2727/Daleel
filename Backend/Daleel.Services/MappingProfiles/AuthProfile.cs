using AutoMapper;
using Daleel.Domain.Entities.Identity;
using Daleel.Shared.DTOs.IdentityDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.MappingProfiles
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<RegisterDTO, ApplicationUser>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.ProfilePictureUrl, opt => opt.Ignore())
                .ForMember(dest => dest.RefreshToken, opt => opt.Ignore())
                .ForMember(dest => dest.RefreshTokenExpiryTime, opt => opt.Ignore())
                .ForMember(dest => dest.OtpCode, opt => opt.Ignore())
                .ForMember(dest => dest.OtpPurpose, opt => opt.Ignore())
                .ForMember(dest => dest.OtpExpiry, opt => opt.Ignore());

            CreateMap<ApplicationUser, UserDTO>();
        }
    }
}
