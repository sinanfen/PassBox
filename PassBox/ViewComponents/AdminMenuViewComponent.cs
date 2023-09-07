using Entities.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassBox.Models;

namespace PassBox.ViewComponents;

public class AdminMenuViewComponent : ViewComponent
{
    private readonly UserManager<User> _userManager;

    public AdminMenuViewComponent(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IViewComponentResult> InvokeAsync()
    {
        var user = await _userManager.GetUserAsync(HttpContext.User); //The user that currently logged in
        var roles = await _userManager.GetRolesAsync(user);
        if (User == null)
            return Content("User not found");
        if (roles == null)
            return Content("Roles not found");
        return View(new UserWithRolesViewModel
        {
            User = user,
            Roles = roles
        });
    }
}
