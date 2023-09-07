using AutoMapper;
using Business.Abstract;
using Business.Utilities.Messages;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete;

public class BoxManager : BaseManager, IBoxService
{
    private readonly BoxMessages _boxMessages;

    public BoxManager(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public Task<Box> AddAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Box> DeleteAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<IList<Box>> GetAllAsync()
    {
        return await UnitOfWork.Boxes.GetAllAsync();
    }

    public async Task<Box> GetById(int boxId)
    {
        return await UnitOfWork.Boxes.GetAsync(x => x.Id == boxId);
    }

    public Task HardDeleteAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Box> UpdateAsync()
    {
        throw new NotImplementedException();
    }
}
