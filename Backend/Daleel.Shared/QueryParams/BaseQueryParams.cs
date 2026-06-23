using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Shared.QueryParams
{
    public class BaseQueryParams
    {
        public string? Search { get; set; }

        private int _pageIndex = 1;
        public int PageIndex
        {
            get => _pageIndex;
            set => _pageIndex = value <= 0 ? 1 : value;
        }

        private const int  _defaultPageSize = 12;
        private int _pageSize = _defaultPageSize;
        public int PageSize
        {
            get => _pageSize;
            set
            {
                if (value <= 0 || value > _defaultPageSize)
                    _pageSize = _defaultPageSize;
                else
                    _pageSize = value;
            }
        }
    }
}
