using Core.Entities.Abstract;
using Entities.Concrete;

namespace Entities.Dtos.BoxDtos;

public class BoxListDto : DtoGetBase
{
    public IList<Box> Boxes { get; set; }

}
