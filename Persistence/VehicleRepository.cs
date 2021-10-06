using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Tiga.Core.Repositories;
using Tiga.Extensions;
using Tiga.Models;

namespace Tiga.Persistence
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
            context.Vehicles.Add(vehicle);
        }

        public void Delete(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }

        public async Task<QueryResult<Vehicle>> GetAll(VehicleQuery queryObj)
        {
            var queryResult = new QueryResult<Vehicle>();

            var query = context.Vehicles
                    .Include(v => v.Features)
                        .ThenInclude(vf => vf.Feature)
                    .Include(m => m.Model)
                        .ThenInclude(m => m.Make).AsQueryable();



            //var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>
            //{
            //    { "make", v => v.Model.Make.Name },
            //    { "model", v => v.Model.Name },
            //    { "contactName", v => v.ContactName },
            //    { "id", v => v.Id }
            //};            


            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName,
            };


            if (queryObj.MakeId.HasValue)
            {
                query = query.Where(f => f.Model.MakeId == queryObj.MakeId.Value);
            }


            query = query.ApplyOrdering(columnsMap, queryObj);

            queryResult.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            queryResult.Items = await query.ToListAsync();

            //if (queryObj.IsSortAscending)
            //    query = query.OrderBy(columnsMap[queryObj.SortBy]);
            //else
            //    query = query.OrderByDescending(columnsMap[queryObj.SortBy]);


            //if (queryObj.SortBy == "make")
            //    query = (queryObj.IsSortAscending) ? query.OrderBy(v => v.Model.Make.Name) : query.OrderByDescending(v => v.Model.Make.Name);
            //if (queryObj.SortBy == "model")
            //    query = (queryObj.IsSortAscending) ? query.OrderBy(v => v.Model.Name) : query.OrderByDescending(v => v.Model.Name);
            //if (queryObj.SortBy == "contactName")
            //    query = (queryObj.IsSortAscending) ? query.OrderBy(v => v.ContactName) : query.OrderByDescending(v => v.ContactName);
            //if (queryObj.SortBy == "id")
            //    query = (queryObj.IsSortAscending) ? query.OrderBy(v => v.Id) : query.OrderByDescending(v => v.Id);

            return queryResult;
        }



        public async Task<Vehicle> GetById(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
              .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
              .Include(v => v.Model)
                .ThenInclude(m => m.Make)
              .SingleOrDefaultAsync(v => v.Id == id);

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
    }
}
