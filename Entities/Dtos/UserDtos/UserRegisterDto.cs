using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos.UserDtos;

public class UserRegisterDto
{
    public string UserName { get; set; }

    [DataType(DataType.Password)]
    public string PasswordHash { get; set; }

    public string Email { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }
}
