using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos.UserDtos;

public class UserLoginDto
{
    [Required(ErrorMessage = "The {0} field is required.")]
    [MaxLength(256, ErrorMessage = "The {0} field must not exceed {1} characters.")]
    [MinLength(10, ErrorMessage = "The {0} field must not be less than {1} characters.")]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [Required(ErrorMessage = "The {0} field is required.")]
    [MaxLength(32, ErrorMessage = "The {0} field must not exceed {1} characters.")]
    [MinLength(8, ErrorMessage = "The {0} field must not be less than {1} characters.")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    public bool RememberMe { get; set; }
}
