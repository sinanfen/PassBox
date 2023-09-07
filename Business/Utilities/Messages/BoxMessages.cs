using Business.Utilities.Messages.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Utilities.Messages;

public class BoxMessages : EntityMessageBase<Box>
{
    protected override int GetEntityId(Box box)
    {
        return box.Id;
    }

    protected override string GetEntityTitle(Box box)
    {
        return box.SiteName;
    }
}
