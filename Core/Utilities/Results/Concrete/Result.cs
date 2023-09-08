using Core.Entities.Concrete;
using Core.Utilities.Results.Abstract;
using Core.Utilities.Results.ComplexTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Core.Utilities.Results.Concrete;

public class Result : IResult
{
    public Result(ResultStatus resultStatus)
    {
        ResultStatus = resultStatus;
    }

    public Result(ResultStatus resultStatus, IEnumerable<ValidationError> validationErrors)
    {
        ResultStatus = resultStatus;
        ValidationErrors = validationErrors;
    }

    public Result(ResultStatus resultStatus, string message)
    {
        ResultStatus = resultStatus;
        Message = message;
    }

    public Result(ResultStatus resultStatus, string message, IEnumerable<ValidationError> validationErrors)
    {
        ResultStatus = resultStatus;
        Message = message;
        ValidationErrors = validationErrors;
    }

    public Result(ResultStatus resultStatus, string message, Exception exception)
    {
        ResultStatus = resultStatus;
        Message = message;
        Exception = exception;
    }

    public Result(ResultStatus resultStatus, string message, Exception exception, IEnumerable<ValidationError> validationErrors)
    {
        ResultStatus = resultStatus;
        Message = message;
        Exception = exception;
        ValidationErrors = validationErrors;
    }

    public ResultStatus ResultStatus { get; }

    public string Message { get; }

    public Exception Exception { get; }

    private IEnumerable<ValidationError> _validationErrors = new List<ValidationError>();

    public IEnumerable<ValidationError> ValidationErrors
    {
        get { return _validationErrors ?? new List<ValidationError>(); }
        set { _validationErrors = value; }
    }

    //örnek kullanım: 
    //new Result(ResultStatus.Error,"İşlem başarısız oldu.",exception)
}
