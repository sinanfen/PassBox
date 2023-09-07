using System.ComponentModel.DataAnnotations;

namespace PassBox.Dtos.UserDtos;

public class UserRegisterViewModel
{
    public string UserName { get; set; }

    [DataType(DataType.Password)]
    public string Password { get; set; }

    public string Mail { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }
}
