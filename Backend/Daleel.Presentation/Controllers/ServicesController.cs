using Daleel.Services.Abstraction;
using Daleel.Shared;
using Daleel.Shared.DTOs;
using Daleel.Shared.QueryParams;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet] // GET: baseUrl/api/services
        public async Task<ActionResult<PaginatedResult<ServiceDTO>>> GetAllServices([FromQuery] ServiceQueryParams serviceQueryParams)
        {
            var services = await _serviceService.GetAllServicesAsync(serviceQueryParams);

            return Ok(services);
        }

        [HttpGet("{id}")] // GET: baseUrl/api/services/{id}
        public async Task<ActionResult<ServiceDTO>> GetService(int id)
        {
            var service = await _serviceService.GetServiceByIdAsync(id);

            return Ok(service);
        }
    }
}
