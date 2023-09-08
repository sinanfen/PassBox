using Core.Utilities.Results.ComplexTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Abstract;

public abstract class DtoGetBase //GET işlemleri için Base DTO.
{
    //Virtual -> override edilebilir.
    public virtual ResultStatus ResultStatus { get; set; }
    public virtual string Message { get; set; }
}