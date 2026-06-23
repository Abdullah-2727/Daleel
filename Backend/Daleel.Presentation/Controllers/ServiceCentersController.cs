using Daleel.Services.Abstraction;
using Daleel.Shared;
using Daleel.Shared.DTOs.ServiceCenterDTOs;
using Daleel.Shared.QueryParams;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceCentersController : ControllerBase
    {
        private readonly IServiceCenterService _serviceCenterService;

        public ServiceCentersController(IServiceCenterService serviceCenterService)
        {
            _serviceCenterService = serviceCenterService;
        }

        [HttpGet] // GET: baseUrl/api/servicecenters
        public async Task<ActionResult<PaginatedResult<ServiceCenterDTO>>> GetAllServiceCenters([FromQuery] ServiceCenterQueryParams serviceCenterQueryParams)
        {
            var serviceCenters = await _serviceCenterService.GetAllServiceCentersAsync(serviceCenterQueryParams);

            return Ok(serviceCenters);
        }

        [HttpGet("{id}")] // GET: baseUrl/api/servicecenters/{id}
        public async Task<ActionResult<ServiceCenterDTO>> GetServiceCenter(int id)
        {
            var serviceCenter = await _serviceCenterService.GetServiceCenterByIdAsync(id);

            return Ok(serviceCenter);
        }

        [HttpGet("{id}/location")] // GET: baseUrl/api/servicecenters/{id}/location
        public async Task<ActionResult<ServiceCenterLocationDTO>> GetServiceCenterLocation(int id)
        {
            var location = await _serviceCenterService.GetServiceCenterLocationAsync(id);

            return Ok(location);
        }
    }
}
