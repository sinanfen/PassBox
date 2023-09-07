using Entities.Concrete;
using PassBox.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract;

public interface IBoxRepository : IEntityRepository<Box>
{
}
