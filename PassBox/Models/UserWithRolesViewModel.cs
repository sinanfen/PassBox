using Entities.Concrete;

namespace PassBox.Models;

public class UserWithRolesViewModel
{
    public User User { get; set; }
    public IList<string> Roles { get; set; }
}
