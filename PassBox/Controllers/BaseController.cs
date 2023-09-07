using AutoMapper;
using Entities.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace PassBox.Controllers;

public class BaseController : Controller
{
    public BaseController(UserManager<User> userManager, IMapper mapper)
    {
        UserManager = userManager;
        Mapper = mapper;   
    }

    protected UserManager<User> UserManager { get; }
    protected IMapper Mapper { get; }  
    protected User LoggedInUser => UserManager.GetUserAsync(HttpContext.User).Result;
}
