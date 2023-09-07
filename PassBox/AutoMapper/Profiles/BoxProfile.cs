using AutoMapper;
using Entities.Concrete;
using PassBox.Dtos.BoxDtos;

namespace PassBox.AutoMapper.Profiles;

public class BoxProfile : Profile
{
    public BoxProfile()
    {
        CreateMap<BoxAddDto, Box>().ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(x => DateTime.Now)); 
        CreateMap<BoxUpdateDto, Box>().ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(x => DateTime.Now));
        CreateMap<Box, BoxUpdateDto>();
    }
}
