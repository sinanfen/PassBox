using AutoMapper;
using Business.Abstract;
using Business.ValidationRules;
using Core.Utilities.Extensions;
using Core.Utilities.Results.ComplexTypes;
using Entities.Concrete;
using Entities.Dtos.BoxDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassBox.Models;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace PassBox.Controllers;

public class BoxController : BaseController
{
    private readonly IBoxService _boxService;
    private readonly BoxValidator boxValidator = new();

    public BoxController(UserManager<User> userManager, IMapper mapper, IBoxService boxService) : base(userManager, mapper)
    {
        _boxService = boxService;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        try
        {
            var boxes = await _boxService.GetAllByUserAsync(LoggedInUser.Id);
            if (boxes.ResultStatus == ResultStatus.Success)
            {
                return View(new BoxListDto { Boxes = boxes.Data.Boxes });
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception ex)
        {

            return View(ex);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetDetail(int boxId)
    {
        var result = await _boxService.GetAsync(boxId);
        if (result.ResultStatus == ResultStatus.Success)
        {
            return PartialView("_GetBoxDetailPartial", result.Data);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet]
    public IActionResult Add()
    {
        return PartialView("_BoxAddPartial");
    }

    [HttpPost]
    public async Task<IActionResult> Add(BoxAddDto boxAddDto)
    {
        var checkForBox = Mapper.Map<Box>(boxAddDto);

        // Validate the Box model using the BoxValidator
        var validationResult = boxValidator.Validate(checkForBox);

        // Check the validation result
        if (!validationResult.IsValid)
        {
            // If validation fails, add the validation errors to ModelState
            foreach (var error in validationResult.Errors)
            {
                ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
            }

            // Return the view with validation errors
            var boxAddAjaxErrorModel = JsonSerializer.Serialize(new BoxAddAjaxViewModel
            {
                BoxAddDto = boxAddDto,
                BoxAddPartial = await this.RenderViewToStringAsync("_BoxAddPartial", boxAddDto)
            });
            return Json(boxAddAjaxErrorModel);
        }

        string hashedPassword = HashPassword(checkForBox.Password);
        boxAddDto.Password = hashedPassword;

        var result = await _boxService.AddAsync(boxAddDto, $"{LoggedInUser.FirstName} {LoggedInUser.LastName}", LoggedInUser.Id);
        if (result.ResultStatus == ResultStatus.Success)
        {
            var boxAddAjaxModel = JsonSerializer.Serialize(new BoxAddAjaxViewModel
            {
                BoxDto = new BoxDto
                {
                    ResultStatus = ResultStatus.Success,
                    Message = result.Message,
                    Box = checkForBox
                },
                BoxAddPartial = await this.RenderViewToStringAsync("_BoxAddPartial", boxAddDto)
            });
            return Json(boxAddAjaxModel);
        }
        else
        {
            foreach (var error in result.ValidationErrors)
            {
                ModelState.AddModelError(error.PropertyName, error.Message);
            }
            var boxAddAjaxErrorModel = JsonSerializer.Serialize(new BoxAddAjaxViewModel
            {
                BoxAddDto = boxAddDto,
                BoxAddPartial = await this.RenderViewToStringAsync("_BoxAddPartial", boxAddDto)
            });
            return Json(boxAddAjaxErrorModel);
        }
    }


    [HttpGet]
    public async Task<IActionResult> Update(int boxId)
    {
        var result = await _boxService.GetBoxUpdateDtoAsync(boxId);
        if (result.ResultStatus == ResultStatus.Success)
        {
            return PartialView("_BoxUpdatePartial", result.Data);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<IActionResult> Update(BoxUpdateDto boxUpdateDto)
    {
        var checkForBox = Mapper.Map<Box>(boxUpdateDto);

        // Validate the Box model using the BoxValidator
        var validationResult = boxValidator.Validate(checkForBox);

        // Check the validation result
        if (!validationResult.IsValid)
        {
            // If validation fails, add the validation errors to ModelState
            foreach (var error in validationResult.Errors)
            {
                ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
            }

            // Return the view with validation errors
            var boxUpdateAjaxErrorModel = JsonSerializer.Serialize(new BoxUpdateAjaxViewModel
            {
                BoxUpdateDto = boxUpdateDto,
                BoxUpdatePartial = await this.RenderViewToStringAsync("_BoxUpdatePartial", boxUpdateDto)
            });
            return Json(boxUpdateAjaxErrorModel);
        }

        string hashedPassword = HashPassword(checkForBox.Password);
        boxUpdateDto.Password = hashedPassword;

        var result = await _boxService.UpdateAsync(boxUpdateDto, $"{LoggedInUser.FirstName} {LoggedInUser.LastName}");
        if (result.ResultStatus == ResultStatus.Success)
        {
            var boxUpdateAjaxModel = JsonSerializer.Serialize(new BoxUpdateAjaxViewModel
            {
                BoxDto = new BoxDto
                {
                    ResultStatus = ResultStatus.Success,
                    Message = result.Message,
                    Box = result.Data.Box
                },
                BoxUpdatePartial = await this.RenderViewToStringAsync("_BoxUpdatePartial", boxUpdateDto),

            });
            return Json(boxUpdateAjaxModel);
        }
        else
        {
            foreach (var error in result.ValidationErrors)
            {
                ModelState.AddModelError("", error.Message);
            }
            var boxUpdateErrorViewModel = JsonSerializer.Serialize(new BoxUpdateAjaxViewModel
            {
                BoxUpdateDto = boxUpdateDto,
                BoxUpdatePartial = await this.RenderViewToStringAsync("_BoxUpdatePartial", boxUpdateDto)
            });
            return Json(boxUpdateErrorViewModel);
        }
    }

    public string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Convert the byte array to a hexadecimal string
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < hashedBytes.Length; i++)
            {
                builder.Append(hashedBytes[i].ToString("x2"));
            }

            return builder.ToString();
        }
    }
}
