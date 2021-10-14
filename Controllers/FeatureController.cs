using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Tiga.Models;
using Tiga.Persistence;

namespace Tiga.Controllers
{
    public class FeatureController : Controller
    {
        readonly TigaDbContext context;

        public FeatureController(TigaDbContext tigaDbContext)
        {
            context = tigaDbContext;
        }

        public IActionResult Index()
        {
            return View();
        }
        //[Authorize(AppPolicies.RequiredAdminRole)]
        [HttpGet("/api/Features")]
        public IEnumerable<Feature> GetFeatures()
        {
            return context.Features.ToList();
        }
    }
}
