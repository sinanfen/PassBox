
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract;

public interface IBoxService
{
    //Task<BoxDto> GetAsync(int boxId);
    //Task<BoxListDto> GetAllAsync();
    //Task<BoxDto> AddAsync(BoxAddDto boxAddDto, string createdBy, int userId);
    //Task<BoxDto> UpdateAsync(BoxUpdateDto boxUpdateDto, string modifiedBy);
    //Task<BoxDto> DeleteAsync();
    //Task HardDeleteAsync();

    Task<Box> GetById(int boxId);
    Task<IList<Box>> GetAllAsync();
    Task<Box> AddAsync();
    Task<Box> UpdateAsync();
    Task<Box> DeleteAsync();
    Task HardDeleteAsync();
}
