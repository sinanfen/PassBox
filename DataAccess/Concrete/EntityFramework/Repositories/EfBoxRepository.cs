using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using PassBox.Core.Data.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework.Repositories;

public class EfBoxRepository : EfEntityRepositoryBase<Box>, IBoxRepository
{
    public EfBoxRepository(DbContext context) : base(context)
    {
    }
}
