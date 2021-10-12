using System.Collections.Generic;
using System.Threading.Tasks;
using Tiga.Models;

namespace Tiga.Core
{
    public interface IPhotoRespository
    {
        Task<IEnumerable<Photo>> GetAll(int vehicleId);
        Task<Photo> GetById(int id, bool includeRelated = true);
        void Create(Photo vehicle);
        void Delete(Photo vehicle);
    }
}