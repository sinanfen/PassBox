using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules;

public class BoxValidator : AbstractValidator<Box>   
{
    public BoxValidator()
    {
        RuleFor(x => x.URL).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.URL).MaximumLength(256).WithMessage("You can enter up to 256 characters.");

        RuleFor(x => x.SiteName).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.SiteName).MaximumLength(256).WithMessage("You can enter up to 256 characters.");

        RuleFor(x => x.Username).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.Username).MaximumLength(256).WithMessage("You can enter up to 256 characters.");

        RuleFor(x => x.Password).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.Password).MaximumLength(32).WithMessage("You can enter up to 32 characters.");
    }
}
