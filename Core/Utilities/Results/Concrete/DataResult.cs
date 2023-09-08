using Core.Entities.Concrete;
using Core.Utilities.Results.Abstract;
using Core.Utilities.Results.ComplexTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Core.Utilities.Results.Concrete;

public class DataResult<T> : IDataResult<T>
{
    public DataResult(ResultStatus resultStatus, T data)
    {
        ResultStatus = resultStatus;
        Data = data;
    }

    public DataResult(ResultStatus resultStatus, T data, IEnumerable<ValidationError> validationErrors)
    {
        ResultStatus = resultStatus;
        Data = data;
        ValidationErrors = validationErrors;
    }

    public DataResult(ResultStatus resultStatus, string message, T data)
    {
        ResultStatus = resultStatus;
        Data = data;
        Message = message;
    }

    public DataResult(ResultStatus resultStatus, string message, T data, IEnumerable<ValidationError> validationErrors)
    {
        ResultStatus = resultStatus;
        Message = message;
        Data = data;
        ValidationErrors = validationErrors;
    }

    public DataResult(ResultStatus resultStatus, string message, T data, Exception exception)
    {
        ResultStatus = resultStatus;
        Message = message;
        Data = data;
        Exception = exception;
    }

    public DataResult(T data, ResultStatus resultStatus, string message, IEnumerable<ValidationError> validationErrors, Exception exception)
    {
        Data = data;
        ResultStatus = resultStatus;
        Message = message;
        Exception = exception;
        ValidationErrors = validationErrors;
    }

    public T Data { get; }

    public ResultStatus ResultStatus { get; }

    public string Message { get; }

    public Exception Exception { get; }
    public IEnumerable<ValidationError> ValidationErrors { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
}
