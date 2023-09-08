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
        RuleFor(x => x.URL).Length(10, 256).WithMessage("Must be between 10 and 256 chars");

        RuleFor(x => x.SiteName).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.SiteName).Length(3, 256).WithMessage("Must be between 3 and 256 chars");

        RuleFor(x => x.Username).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.Username).Length(3, 150).WithMessage("Must be between 3 and 150 chars");

        RuleFor(x => x.Password).NotEmpty().WithMessage("This field cannot be left blank");
        RuleFor(x => x.Password).Length(8, 32).WithMessage("Must be between 8 and 32 chars");
    }
}
