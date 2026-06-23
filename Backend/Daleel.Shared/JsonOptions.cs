using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace Daleel.Shared
{
    public static class JsonOptions
    {
        public static readonly JsonSerializerOptions PascalCase = new() 
        { 
            PropertyNamingPolicy = null 
        };

        public static readonly JsonSerializerOptions CaseInsensitive = new() 
        { 
            PropertyNameCaseInsensitive = true 
        };

        ///public static readonly JsonSerializerOptions Web = new() 
        ///{ 
        ///    PropertyNameCaseInsensitive = true, 
        ///    PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
        ///};
    }
}
