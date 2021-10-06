using System;
using System.Threading.Tasks;

namespace Tiga.Core
{
  public interface IUnitOfWork
  {
    Task CompleteAsync();
  }
}