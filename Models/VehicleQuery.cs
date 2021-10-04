﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tiga.Extensions;

namespace Tiga.Models
{
    public class VehicleQuery : IQueryObject
    {
        public int? MakeId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
    }
}