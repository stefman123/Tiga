using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tiga.Models;

namespace Tiga.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly TigaDbContext context;

        public VehicleRepository(TigaDbContext context)
        {
            this.context = context;
        }

        public void Create(Vehicle vehicle)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            var vehicle = GetById(id);

            context.Remove(vehicle);
        }

        public IEnumerable<Vehicle> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<Vehicle> GetById(int id)
        {
            var vehicle = await context.Vehicles
                             .Include(v => v.Features)
                                 .ThenInclude(vf => vf.Feature)
                             .Include(m => m.Model)
                                 .ThenInclude(m => m.Make)
                             .SingleOrDefaultAsync(v => v.Id == id);

            return vehicle;
        }

        public async Task<Vehicle> GetVehicleAsync(int id)
        {

            var vehicle = await context.Vehicles
                                        .Include(v => v.Features)
                                            .ThenInclude(vf => vf.Feature)
                                        .Include(m => m.Model)
                                            .ThenInclude(m => m.Make)
                                        .SingleOrDefaultAsync(v => v.Id == id);

            return vehicle;
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public void Update(Vehicle vehicle)
        {
            throw new NotImplementedException();
        }
    }
}
