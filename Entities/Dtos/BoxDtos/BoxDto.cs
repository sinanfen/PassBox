using Core.Entities.Abstract;
using Entities.Concrete;

namespace Entities.Dtos.BoxDtos;

public class BoxDto : DtoGetBase
{
    public Box Box { get; set; }
}
