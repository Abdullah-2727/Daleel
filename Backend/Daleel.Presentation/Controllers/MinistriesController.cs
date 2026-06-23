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
    public class MinistriesController : ControllerBase
    {
        private readonly IMinistryService _ministryService;

        public MinistriesController(IMinistryService ministryService)
        {
            _ministryService = ministryService;
        }

        [HttpGet] // GET: baseUrl/api/ministries
        public async Task<ActionResult<PaginatedResult<MinistryDTO>>> GetAllMinistries([FromQuery] BaseQueryParams baseQueryParams)
        {
            var ministries = await _ministryService.GetAllMinistriesAsync(baseQueryParams);

            return Ok(ministries);
        }

        [HttpGet("{id}")] // GET: baseUrl/api/ministries/{id}
        public async Task<ActionResult<MinistryDTO>> GetMinistry(int id)
        {
            var ministry = await _ministryService.GetMinistryByIdAsync(id);

            return Ok(ministry);
        }
    }
}
