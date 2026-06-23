using Daleel.Domain.Entities;
using Daleel.Shared.QueryParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Services.Specifications.RequestSpecifications
{
    public class RequestWithServiceAndResponseSpecification : BaseSpecifications<Request, int>
    {
        public RequestWithServiceAndResponseSpecification(string userId, RequestQueryParams queryParams)
            : base(r =>
                r.UserId == userId &&
                (queryParams.Status == null || r.Status == queryParams.Status) &&
                (string.IsNullOrEmpty(queryParams.Search) || r.Service.Name.Contains(queryParams.Search)))
        {
            AddInclude(r => r.Service);
            AddInclude(r => r.Response!);

            if (queryParams.IsDescending)
                AddOrderByDescending(r => r.CreatedAt);
            else
                AddOrderBy(r => r.CreatedAt);

            ApplyPagination(queryParams.PageSize, queryParams.PageIndex);
        }

        public RequestWithServiceAndResponseSpecification(string userId)
            : base(r => r.UserId == userId)
        {
            AddInclude(r => r.Service);
            AddInclude(r => r.Response!);
        }

        public RequestWithServiceAndResponseSpecification(int requestId, string userId)
            : base(r => r.Id == requestId && r.UserId == userId)
        {
            AddInclude(r => r.Service);
            AddInclude(r => r.Response!);
        }
    }
}
