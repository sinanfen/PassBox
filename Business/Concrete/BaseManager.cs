using AutoMapper;
using DataAccess.Abstract;

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
