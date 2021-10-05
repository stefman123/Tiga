using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tiga.Models
{
    public class QueryResult<T>
    {
        public int TotalItems { get; set; }

        public IEnumerable<T> Items { get; set; }
    }
}
