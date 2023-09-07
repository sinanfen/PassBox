using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete;

public class Box : EntityBase, IEntity
{
    public string URL { get; set; }
    public string SiteName { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    //Relationship with User - many-to-one
    public int UserId { get; set; }
    public User User { get; set; }
}
