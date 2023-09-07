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

public class EfBoxDal : EfEntityRepositoryBase<Box>, IBoxDal
{
    public EfBoxDal(DbContext context) : base(context)
    {
    }
}
