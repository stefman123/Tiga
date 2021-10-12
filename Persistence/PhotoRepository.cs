using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tiga.Core;
using Tiga.Models;

namespace Tiga.Persistence
{
    public class PhotoRepository : IPhotoRespository
    {
        private readonly TigaDbContext context;
        public PhotoRepository(TigaDbContext context)
        {
            this.context = context;

        }

        public void Create(Photo vehicle)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(Photo vehicle)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Photo>> GetAll(int vehicleId)
        {
            return await context.Photos.Where(p => p.VehicleId == vehicleId).ToListAsync();
        }

        public Task<Photo> GetById(int id, bool includeRelated = true)
        {
            throw new System.NotImplementedException();
        }
    }
}