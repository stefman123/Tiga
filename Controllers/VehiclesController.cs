using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tiga.Controllers.Resources;
using Tiga.Core;
using Tiga.Core.Repositories;
using Tiga.Models;
using Tiga.Persistence;

namespace Tiga.Controllers
{
    [Route("/api/[Controller]")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly TigaDbContext tigaDbContext;

        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(IMapper mapper , TigaDbContext tigaDbContext, IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork )
        {
            this.mapper = mapper;
            this.tigaDbContext = tigaDbContext;
            this.vehicleRepository = vehicleRepository;
            this.unitOfWork = unitOfWork;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var model = await tigaDbContext.Models.FindAsync( vehicleResource.ModelId);

            if (model == null)
            {
                ModelState.AddModelError("ModelId", "Invalid modelId.");
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);

            vehicle.LastUpdate = DateTimeOffset.Now;
            tigaDbContext.Vehicles.Add(vehicle);
            await tigaDbContext.SaveChangesAsync();

            await vehicleRepository.GetById(vehicle.Id);


            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await vehicleRepository.GetById(id);

            if (vehicle == null)
                return NotFound();

            if (vehicle == null)
            {
                ModelState.AddModelError("ModelId", "Invalid Vehicle.");
                return BadRequest(ModelState);
            }

            mapper.Map(vehicleResource,vehicle);

            vehicle.LastUpdate = DateTimeOffset.Now;
            await unitOfWork.CompleteAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var vehicle = await tigaDbContext.Vehicles.FindAsync(id);
            
            if (vehicle == null)
                return NotFound();


           vehicleRepository.Delete(vehicle);
           await unitOfWork.CompleteAsync();

            return Ok(id);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //var vehicle = await tigaDbContext.Vehicles
            //    .Include(v => v.Features)
            //        .ThenInclude(vf => vf.Feature)
            //    .Include(m => m.Model)
            //        .ThenInclude(m => m.Make)
            //    .SingleOrDefaultAsync( v => v.Id == id);

            var vehicle = await vehicleRepository.GetById(id);

            if (vehicle == null)
                return NotFound();

            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }


        [HttpGet]
        public async Task<QueryResultResource<VehicleResource>> GetAllVehicles(VehicleQueryResource filterResource)
        {
           var filter = mapper.Map<VehicleQueryResource, VehicleQuery>(filterResource);
            var queryResult = await vehicleRepository.GetAll(filter);

            return  mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);

        }
    }
}
