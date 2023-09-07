using Business.Utilities.Messages.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Utilities.Messages;

public class UserMessages : EntityMessageBase<User>
{
    public static new string NotFoundById(int userId)
    {
        return $"Could not find a user with user code {userId}.";
    }

    protected override int GetEntityId(User user)
    {
        return user.Id;
    }

    protected override string GetEntityTitle(User user)
    {
        return user.UserName;
    }
}
