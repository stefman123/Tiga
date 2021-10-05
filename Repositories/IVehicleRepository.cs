using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tiga.Models;

namespace Tiga.Repositories
{
    public interface IVehicleRepository
    {
        Task<QueryResult<Vehicle>> GetAll(VehicleQuery filter);
        Task<Vehicle> GetById(int id);
        void Create(Vehicle vehicle);
        void Update(Vehicle vehicle);
        void Delete(int id);
        void Save();
    }
}
