using System.Threading.Tasks;
using Tiga.Core;

namespace Tiga.Persistence
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly TigaDbContext context;

    public UnitOfWork(TigaDbContext context)
    {
      this.context = context;
    }

    public async Task CompleteAsync()
    {
      await context.SaveChangesAsync();
    }
  }
}