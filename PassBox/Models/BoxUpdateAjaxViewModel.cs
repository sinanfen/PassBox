using Entities.Dtos.BoxDtos;

namespace PassBox.Models;

public class BoxUpdateAjaxViewModel
{
    public BoxUpdateDto BoxUpdateDto { get; set; }
    public string BoxUpdatePartial { get; set; }
    public BoxDto BoxDto { get; set; }
}
