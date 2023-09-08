using Entities.Dtos.BoxDtos;

namespace PassBox.Models;

public class BoxAddAjaxViewModel
{
    public BoxAddDto BoxAddDto { get; set; }
    public string BoxAddPartial { get; set; }
    public BoxDto BoxDto { get; set; }
}
