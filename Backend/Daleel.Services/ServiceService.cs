using AutoMapper;
using Daleel.Domain.Contracts;
using Daleel.Domain.Entities;
using Daleel.Services.Abstraction;
using Daleel.Services.Specifications;
using Daleel.Services.Specifications.ServiceSpecifications;
using Daleel.Shared;
using Daleel.Shared.DTOs;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ServiceService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<ServiceDTO>> GetAllServicesAsync(ServiceQueryParams serviceQueryParams)
        {
            var spec = new ServiceWithMinistrySpecifications(serviceQueryParams);
            var services = await _unitOfWork.GetRepository<Service, int>().GetAllAsync(spec);

            var serviceWithCountSpec = new ServiceWithCountSpecifications(serviceQueryParams);
            var totalCount = await _unitOfWork.GetRepository<Service, int>().CountAsync(serviceWithCountSpec);

            var dataToReturn = _mapper.Map<IEnumerable<ServiceDTO>>(services);
            var countOfReturnedData = dataToReturn.Count();

            return new PaginatedResult<ServiceDTO>(
                serviceQueryParams.PageIndex,
                countOfReturnedData,
                totalCount,
                dataToReturn
                );
        }

        public async Task<ServiceDTO> GetServiceByIdAsync(int id)
        {
            var spec = new ServiceWithMinistrySpecifications(id);

            var service = await _unitOfWork.GetRepository<Service, int>().GetByIdAsync(spec);

            return _mapper.Map<ServiceDTO>(service);
        }
    }
}
