using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete;

public class UnitOfWork : IUnitOfWork
{
    private readonly PassBoxDbContext _context;

    public UnitOfWork(PassBoxDbContext context)
    {
        _context = context;
    }

    private EfBoxDal _efBoxDal;

    public IBoxDal Boxes => _efBoxDal ??= new EfBoxDal(_context);

    public async ValueTask DisposeAsync()
    {
        await _context.DisposeAsync();
    }

    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
