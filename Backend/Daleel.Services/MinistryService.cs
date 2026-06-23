using AutoMapper;
using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Services.Abstraction;
using Daleel.Services.Specifications;
using Daleel.Services.Specifications.MinistrySpecifications;
using Daleel.Shared;
using Daleel.Shared.DTOs;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services
{
    public class MinistryService : IMinistryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MinistryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<MinistryDTO>> GetAllMinistriesAsync(BaseQueryParams baseQueryParams)
        {
            var spec = new MinistrySpecifications(baseQueryParams);
            var ministries = await _unitOfWork.GetRepository<Ministry, int>().GetAllAsync(spec);

            var ministryWithCountSpec = new MinistryWithCountSpecifications(baseQueryParams);
            var totalCount = await _unitOfWork.GetRepository<Ministry, int>().CountAsync(ministryWithCountSpec);

            var dataToReturn = _mapper.Map<IEnumerable<MinistryDTO>>(ministries);
            var countOfReturnedData = dataToReturn.Count();

            return new PaginatedResult<MinistryDTO>(
                baseQueryParams.PageIndex,
                countOfReturnedData,
                totalCount,
                dataToReturn
                );
        }

        public async Task<MinistryDTO> GetMinistryByIdAsync(int id)
        {
            var ministry = await _unitOfWork.GetRepository<Ministry, int>().GetByIdAsync(id);

            return _mapper.Map<MinistryDTO>(ministry);
        }
    }
}
