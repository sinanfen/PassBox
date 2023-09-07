using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Concrete.EntityFramework.Mappings;

public class BoxMap : IEntityTypeConfiguration<Box>
{
    public void Configure(EntityTypeBuilder<Box> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Property(e => e.URL).IsRequired(true);
        builder.Property(e => e.URL).HasMaxLength(256);
        builder.Property(e => e.SiteName).IsRequired(true);
        builder.Property(e => e.SiteName).HasMaxLength(256);
        builder.Property(e => e.Username).IsRequired(true);
        builder.Property(e => e.Username).HasMaxLength(256);
        builder.Property(e => e.Password).IsRequired(true);
        builder.Property(e => e.Password).HasMaxLength(256);

        builder.ToTable("Boxes");

        builder.HasOne<User>(u => u.User).WithMany(u => u.Boxes).HasForeignKey(u => u.UserId);

        builder.HasData(new Box
        {
            Id = 1,
            UserId = 1,
            URL = "https://www.google.com.tr/",
            SiteName = "Google",
            Username = "googleUsername",
            Password = "googlePassword",
            Status = Core.Entities.Enums.DataStatus.Created
        },
        new Box
        {
            Id = 2,
            UserId = 1,
            URL = "https://twitter.com/",
            SiteName = "Twitter",
            Username = "twitterUsername",
            Password = "twitterPassword",
            Status = Core.Entities.Enums.DataStatus.Created
        },
        new Box
        {
            Id = 3,
            UserId = 1,
            URL = "https://github.com/",
            SiteName = "Github",
            Username = "githubUsername",
            Password = "githubPassword",
            Status = Core.Entities.Enums.DataStatus.Created
        });
    }
}
