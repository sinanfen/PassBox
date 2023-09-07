using AutoMapper;
using Business.ValidationRules;
using Entities.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassBox.Dtos.UserDtos;

namespace PassBox.Controllers;

public class AuthController : Controller
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;
    private readonly UserValidator _userValidator;

    public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _mapper = mapper;     
    }

    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }


    [HttpPost]
    public async Task<IActionResult> Login(UserLoginViewModel userLoginViewModel)
    {
        if (ModelState.IsValid)
        {
            var user = await _userManager.FindByEmailAsync(userLoginViewModel.Email);
            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(user, userLoginViewModel.Password, userLoginViewModel.RememberMe, false);
                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Your email address or password is incorrect.");
                    return View();
                }
            }
            else
            {
                ModelState.AddModelError("", "Your email address or password is incorrect.");
                return View();
            }
        }
        else
        {
            return View();
        }
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return RedirectToAction("Login", "Auth");
    }

    [HttpGet]
    public async Task<IActionResult> Register(UserRegisterViewModel userRegisterViewModel)
    {
        var checkUser = _mapper.Map<User>(userRegisterViewModel);

        // Validate the user model using the UserValidator
        var validationResult = _userValidator.Validate(checkUser);

        // Check the validation result
        if (!validationResult.IsValid)
        {
            // If validation fails, add the validation errors to ModelState
            foreach (var error in validationResult.Errors)
            {
                ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
            }

            // Return the view with validation errors
            return View();
        }

        if (ModelState.IsValid)
        {
            var user = _mapper.Map<User>(userRegisterViewModel);

            var result = await _userManager.CreateAsync(user, userRegisterViewModel.Password);

            if (result.Succeeded)
            {
                return RedirectToAction("Login", "Auth");
            }
            else
            {
                // Handle any registration errors and add them to ModelState if necessary
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }
        }

        // Return the view with model state errors
        return View();
    }
}
