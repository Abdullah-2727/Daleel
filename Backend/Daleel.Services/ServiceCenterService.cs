using AutoMapper;
using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Services.Abstraction;
using Daleel.Services.Specifications;
using Daleel.Services.Specifications.ServiceCenterSpecifications;
using Daleel.Shared;
using Daleel.Shared.DTOs.ServiceCenterDTOs;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services
{
    public class ServiceCenterService : IServiceCenterService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ServiceCenterService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<ServiceCenterDTO>> GetAllServiceCentersAsync(ServiceCenterQueryParams serviceCenterQueryParams)
        {
            var spec = new ServiceCenterWithMinistrySpecifications(serviceCenterQueryParams);
            var serviceCenters = await _unitOfWork.GetRepository<ServiceCenter, int>().GetAllAsync(spec);

            var serviceCenterWithCountSpec = new ServiceCenterWithCountSpecifications(serviceCenterQueryParams);
            var totalCount = await _unitOfWork.GetRepository<ServiceCenter, int>().CountAsync(serviceCenterWithCountSpec);

            var dataToReturn = _mapper.Map<IEnumerable<ServiceCenterDTO>>(serviceCenters);
            var countOfReturnedData = dataToReturn.Count();

            return new PaginatedResult<ServiceCenterDTO>(
                serviceCenterQueryParams.PageIndex,
                countOfReturnedData,
                totalCount,
                dataToReturn
                );
        }

        public async Task<ServiceCenterDTO> GetServiceCenterByIdAsync(int id)
        {
            var spec = new ServiceCenterWithMinistrySpecifications(id);

            var serviceCenter = await _unitOfWork.GetRepository<ServiceCenter, int>().GetByIdAsync(spec);

            return _mapper.Map<ServiceCenterDTO>(serviceCenter);
        }

        public async Task<ServiceCenterLocationDTO> GetServiceCenterLocationAsync(int id)
        {
            var serviceCenter = await _unitOfWork.GetRepository<ServiceCenter, int>().GetByIdAsync(id);

            return _mapper.Map<ServiceCenterLocationDTO>(serviceCenter);
        }
    }
}
