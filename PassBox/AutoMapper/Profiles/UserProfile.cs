using AutoMapper;
using Entities.Concrete;
using PassBox.Dtos.UserDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PassBox.AutoMapper.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserRegisterViewModel, User>().ReverseMap();
        CreateMap<UserUpdateViewModel, User>().ReverseMap();

    }
}
