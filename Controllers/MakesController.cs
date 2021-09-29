using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tiga.Controllers.Resources;
using Tiga.Models;

namespace Tiga.Controllers
{
    public class MakesController : Controller
    {
        private readonly TigaDbContext TigaDbContext;
        private readonly IMapper mapper;

        public MakesController(TigaDbContext tigaDbContext , IMapper mapper )
        {
            TigaDbContext = tigaDbContext;
            this.mapper = mapper;
        }


        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("/api/makes")]
        public IEnumerable<MakeResource> GetMakes()
        {
            var makes = TigaDbContext.Makes.Include( x => x.Models).ToList();

            return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}
