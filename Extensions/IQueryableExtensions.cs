using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Tiga.Models;

namespace Tiga.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, Dictionary<string, Expression<Func<T, object>>> columnsMapping, IQueryObject queryObj)
        {
            if (string.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMapping.ContainsKey(queryObj.SortBy))
            {
                return query;
            }


            if (queryObj.IsSortAscending)
                query = query.OrderBy(columnsMapping[queryObj.SortBy]);
            else
                query = query.OrderByDescending(columnsMapping[queryObj.SortBy]);

            return query;
        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQueryObject queryObj)
        {
            if (queryObj.Page <= 0)
            {
                queryObj.Page = 1;
            }

            if(queryObj.PageSize <= 0)
            {
                queryObj.PageSize = 10;
            }

          return  query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize);
        }

    }
}
