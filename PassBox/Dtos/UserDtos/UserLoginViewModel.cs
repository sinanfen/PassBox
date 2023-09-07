using System.ComponentModel.DataAnnotations;

namespace PassBox.Dtos.UserDtos;

public class UserLoginViewModel
{
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [DataType(DataType.Password)]
    public string Password { get; set; }

    public bool RememberMe { get; set; }
}
