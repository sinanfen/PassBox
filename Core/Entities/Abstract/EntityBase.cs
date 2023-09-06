using Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Abstract;

public abstract class EntityBase
{
    public virtual int Id { get; set; }
    public virtual DateTime CreatedDate { get; set; } = DateTime.Now; //virtual cünkü -> override CreatedDate = new DateTime(12-2-2022); gibi
    public virtual DateTime? ModifiedDate { get; set; }
    public virtual DateTime? DeletedDate { get; set; }
    public DataStatus Status { get; set; }   

    public EntityBase()
    {
        CreatedDate = DateTime.Now;
        Status = DataStatus.Created;        
    }
}
