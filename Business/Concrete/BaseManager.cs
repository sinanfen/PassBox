using AutoMapper;
using DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete;

public class BaseManager
{
    public BaseManager(IUnitOfWork unitOfWork, IMapper mapper)
    {
        UnitOfWork = unitOfWork;
        Mapper = mapper;
    }

    protected IUnitOfWork UnitOfWork { get; }
    protected IMapper Mapper { get; }
}
