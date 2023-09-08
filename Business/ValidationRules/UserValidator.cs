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
        RuleFor(x => x.FirstName).NotEmpty().NotNull().WithMessage("This field cannot be left blank");
        RuleFor(x => x.FirstName).Length(3, 100).WithMessage("This field must be between 3 and 100 chars");

        RuleFor(x => x.LastName).NotEmpty().NotNull().WithMessage("This field cannot be left blank");
        RuleFor(x => x.LastName).Length(3, 100).WithMessage("This field must be between 3 and 100 chars");

        RuleFor(x => x.UserName).NotEmpty().NotNull().WithMessage("This field cannot be left blank");
        RuleFor(x => x.UserName).Length(3, 150).WithMessage("This field must be between 3 and 150 chars");

        RuleFor(x => x.Email).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.Email).MaximumLength(256).WithMessage("You can enter up to 256 characters");
        RuleFor(x => x.Email).EmailAddress().WithMessage("Please enter a valid email");

        RuleFor(p => p.PasswordHash).NotEmpty().NotNull().WithMessage("Your password cannot be empty")
                   .Length(8, 32).WithMessage("Your password must be between 8 and 32 characters");
        //Özelleştirilebilir..
        //.Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.")
        //            .Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.")
        //            .Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.")
        //            .Matches(@"[\!\?\*\.]+").WithMessage("Your password must contain at least one (!? *.).")
    }
}
