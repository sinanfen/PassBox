using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules;

public class UserValidator : AbstractValidator<User>
{
    public UserValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.FirstName).MaximumLength(100).WithMessage("You can enter up to 100 characters");

        RuleFor(x => x.LastName).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.LastName).MaximumLength(100).WithMessage("You can enter up to 100 characters");

        RuleFor(x => x.UserName).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.UserName).MaximumLength(256).WithMessage("You can enter up to 256 characters");
        
        RuleFor(x => x.Email).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.Email).MaximumLength(256).WithMessage("You can enter up to 256 characters");
        RuleFor(x => x.Email).EmailAddress().WithMessage("Please enter a valid email");

        RuleFor(p => p.PasswordHash).NotEmpty().WithMessage("Your password cannot be empty")
                    .MinimumLength(8).WithMessage("Your password length must be at least 8")
                    .MaximumLength(32).WithMessage("Your password length must not exceed 16");
        //Özelleştirilebilir..
        //.Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.")
        //            .Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.")
        //            .Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.")
        //            .Matches(@"[\!\?\*\.]+").WithMessage("Your password must contain at least one (!? *.).")
    }
}
