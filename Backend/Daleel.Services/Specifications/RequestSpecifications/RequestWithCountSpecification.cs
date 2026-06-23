using Daleel.Domain.Entities;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.RequestSpecifications
{
    public class RequestWithCountSpecification : BaseSpecifications<Request, int>
    {
        public RequestWithCountSpecification(string userId, RequestQueryParams queryParams)
            : base(r =>
                r.UserId == userId &&
                (queryParams.Status == null || r.Status == queryParams.Status) &&
                (string.IsNullOrEmpty(queryParams.Search) || r.Service.Name.Contains(queryParams.Search)))
        {
        }
    }
}
