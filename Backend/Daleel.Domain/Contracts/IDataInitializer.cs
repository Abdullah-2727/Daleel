using System;
using System.Collections.Generic;
using System.Text;

namespace Daleel.Domain.Contracts
{
    public interface IDataInitializer
    {
        Task InitializeAsync();
    }
}
