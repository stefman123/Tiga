using System.Threading.Tasks;
using Tiga.Models;

namespace Tiga.Core.Repositories
{
    public interface IVehicleRepository
    {
        Task<QueryResult<Vehicle>> GetAll(VehicleQuery filter);
        Task<Vehicle> GetById(int id, bool includeRelated = true);
        void Create(Vehicle vehicle);
        void Delete(Vehicle vehicle);
    }
}
