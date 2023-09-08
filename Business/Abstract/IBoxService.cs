using Core.Utilities.Results.Abstract;
using Entities.Dtos.BoxDtos;

namespace Business.Abstract;

public interface IBoxService
{
    Task<IDataResult<BoxDto>> GetAsync(int boxId);
    Task<IDataResult<BoxListDto>> GetAllAsync();
    Task<IDataResult<BoxListDto>> GetAllByUserAsync(int userId);
    Task<IDataResult<BoxUpdateDto>> GetBoxUpdateDtoAsync(int boxId);
    Task<IDataResult<BoxDto>> AddAsync(BoxAddDto boxAddDto, string createdBy, int userId);
    Task<IDataResult<BoxDto>> UpdateAsync(BoxUpdateDto boxUpdateDto, string modifiedBy);
    Task<IDataResult<BoxDto>> DeleteAsync(int boxId, string modifiedBy);
    Task<IResult> HardDeleteAsync(int boxId);
}
