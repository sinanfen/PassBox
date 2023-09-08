using AutoMapper;
using Business.Abstract;
using Business.Utilities.Messages;
using Core.Utilities.Results.Abstract;
using Core.Utilities.Results.ComplexTypes;
using Core.Utilities.Results.Concrete;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos.BoxDtos;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Business.Concrete;

public class BoxManager : BaseManager, IBoxService
{
    private readonly BoxMessages _boxMessages;

    public BoxManager(IUnitOfWork unitOfWork, IMapper mapper, BoxMessages boxMessages) : base(unitOfWork, mapper)
    {
        _boxMessages = boxMessages;
    }

    public async Task<IDataResult<BoxDto>> AddAsync(BoxAddDto boxAddDto, string createdBy, int userId)
    {
        var box = Mapper.Map<Box>(boxAddDto);
        box.CreatedBy = createdBy;
        box.UserId = userId;

        var addedBox = await UnitOfWork.Boxes.AddAsync(box);
        await UnitOfWork.SaveAsync();

        var addedBoxMessage = _boxMessages.Add(addedBox);

        return new DataResult<BoxDto>(ResultStatus.Success, addedBoxMessage, new BoxDto
        {
            Box = addedBox,
            Message = addedBoxMessage
        });
    }

    public async Task<IDataResult<BoxDto>> UpdateAsync(BoxUpdateDto boxUpdateDto, string modifiedBy)
    {
        var oldBox = await UnitOfWork.Boxes.GetAsync(b => b.Id == boxUpdateDto.Id);
        var currentBox = Mapper.Map(boxUpdateDto, oldBox);
        currentBox.ModifiedBy = modifiedBy;

        var updatedBox = await UnitOfWork.Boxes.UpdateAsync(currentBox);
        await UnitOfWork.SaveAsync();

        var updatedBoxMessage = _boxMessages.Update(updatedBox);
        return new DataResult<BoxDto>(ResultStatus.Success, updatedBoxMessage, new BoxDto
        {
            Box = updatedBox,
            Message = updatedBoxMessage
        });

    }

    public async Task<IDataResult<BoxDto>> DeleteAsync(int boxId, string modifiedBy)
    {
        var box = await UnitOfWork.Boxes.GetAsync(b => b.Id == boxId);
        if (box != null)
        {
            box.ModifiedBy = modifiedBy;
            box.Status = Core.Entities.Enums.DataStatus.Deleted;
            box.DeletedDate = DateTime.Now;

            var deletedBox = await UnitOfWork.Boxes.UpdateAsync(box);
            await UnitOfWork.SaveAsync();

            var softDeletedBoxMessage = _boxMessages.Delete(deletedBox);
            return new DataResult<BoxDto>(ResultStatus.Success, softDeletedBoxMessage, new BoxDto
            { Box = deletedBox, Message = softDeletedBoxMessage });
        }
        var notFoundSingleMessage = _boxMessages.NotFound(isPlural: false);
        return new DataResult<BoxDto>(ResultStatus.Error, notFoundSingleMessage, new BoxDto
        { Box = null, Message = notFoundSingleMessage });
    }

    public async Task<IDataResult<BoxListDto>> GetAllAsync()
    {
        var boxes = await UnitOfWork.Boxes.GetAllAsync(null, x => x.User);//Predicate null - user include edildi
        if (boxes.Count >= 0)
        {
            return new DataResult<BoxListDto>(ResultStatus.Success, new BoxListDto
            {
                Boxes = boxes,
                ResultStatus = ResultStatus.Success
            });
        }
        var notFoundPluralMessage = _boxMessages.NotFound(isPlural: true);
        return new DataResult<BoxListDto>(ResultStatus.Error, notFoundPluralMessage, new BoxListDto
        {
            Boxes = null,
            Message = notFoundPluralMessage
        });
    }

    public async Task<IDataResult<BoxListDto>> GetAllByUserAsync(int userId)
    {
        var boxes = await UnitOfWork.Boxes.GetAllAsync(x => x.UserId == userId, x => x.User);
        if (boxes.Count >= 0)
        {
            return new DataResult<BoxListDto>(ResultStatus.Success, new BoxListDto
            {
                Boxes = boxes,
                ResultStatus = ResultStatus.Success
            });
        }
        var notFoundPluralMessage = _boxMessages.NotFound(isPlural: true);
        return new DataResult<BoxListDto>(ResultStatus.Error, notFoundPluralMessage, new BoxListDto
        {
            Boxes = null,
            Message = notFoundPluralMessage
        });
    }

    public async Task<IDataResult<BoxDto>> GetAsync(int boxId)
    {
        var box = await UnitOfWork.Boxes.GetAsync(x => x.Id == boxId, x => x.User);
        if (box != null)
        {
            return new DataResult<BoxDto>(ResultStatus.Success, new BoxDto { Box = box });
        }

        var notFoundSingleMessage = _boxMessages.NotFound(isPlural: false);
        return new DataResult<BoxDto>(ResultStatus.Error, notFoundSingleMessage, new BoxDto { Box = null, Message = notFoundSingleMessage });
    }

    public async Task<IResult> HardDeleteAsync(int boxId)
    {
        var box = await UnitOfWork.Boxes.GetAsync(b => b.Id == boxId);
        if (box != null)
        {
            await UnitOfWork.Boxes.DeleteAsync(box);
            await UnitOfWork.SaveAsync();

            var removedBoxMessage = _boxMessages.HardDelete(box);
            return new Result(ResultStatus.Success, removedBoxMessage);
        }
        var notFoundSingleMessage = _boxMessages.NotFound(isPlural: false);
        return new Result(ResultStatus.Error, notFoundSingleMessage);
    }

    public async Task<IDataResult<BoxUpdateDto>> GetBoxUpdateDtoAsync(int boxId)
    {
        var result = await UnitOfWork.Boxes.AnyAsync(b => b.Id == boxId);
        if (result)
        {
            var box = await UnitOfWork.Boxes.GetAsync(e => e.Id == boxId);
            var boxUpdateDto = Mapper.Map<BoxUpdateDto>(box);
            return new DataResult<BoxUpdateDto>(ResultStatus.Success, boxUpdateDto);
        }
        else
        {
            var notFoundSingleMessage = _boxMessages.NotFound(isPlural: false);
            return new DataResult<BoxUpdateDto>(ResultStatus.Error, notFoundSingleMessage, null);
        }
    }
}
