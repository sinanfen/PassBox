using Core.Entities.Concrete;
using Core.Utilities.Results.ComplexTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Results.Abstract;

public interface IResult
{
    public ResultStatus ResultStatus { get; } //ResultStatus.Success
    public string Message { get; }
    public Exception Exception { get; }
    public IEnumerable<ValidationError> ValidationErrors { get; set; }
}
