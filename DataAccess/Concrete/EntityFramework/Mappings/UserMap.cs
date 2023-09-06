using Entities.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework.Mappings;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> b)
    {
        // Primary key
        b.HasKey(u => u.Id);
        b.Property(u => u.Id).ValueGeneratedOnAdd();

        // Indexes for "normalized" username and email, to allow efficient lookups
        b.HasIndex(u => u.NormalizedUserName).HasName("UserNameIndex").IsUnique();
        b.HasIndex(u => u.NormalizedEmail).HasName("EmailIndex").IsUnique();

        // Maps to the AspNetUsers table
        b.ToTable("AspNetUsers");

        // A concurrency token for use with the optimistic concurrency checking
        b.Property(u => u.ConcurrencyStamp).IsConcurrencyToken();

        // Limit the size of columns to use efficient database types
        b.Property(u => u.UserName).HasMaxLength(256);
        b.Property(u => u.NormalizedUserName).HasMaxLength(256);
        b.Property(u => u.Email).HasMaxLength(256);
        b.Property(u => u.NormalizedEmail).HasMaxLength(256);

        // The relationships between User and other entity types
        // Note that these relationships are configured with no navigation properties

        // Each User can have many UserClaims
        b.HasMany<UserClaim>().WithOne().HasForeignKey(uc => uc.UserId).IsRequired();

        // Each User can have many UserLogins
        b.HasMany<UserLogin>().WithOne().HasForeignKey(ul => ul.UserId).IsRequired();

        // Each User can have many UserTokens
        b.HasMany<UserToken>().WithOne().HasForeignKey(ut => ut.UserId).IsRequired();

        // Each User can have many entries in the UserRole join table
        b.HasMany<UserRole>().WithOne().HasForeignKey(ur => ur.UserId).IsRequired();

        var initUser = new User
        {
            Id = 1,
            UserName = "sinanfen",
            NormalizedUserName = "SINANFEN",
            Email = "sinanfen@hotmail.com",
            NormalizedEmail = "SINANFEN@HOTMAIL.COM",
            FirstName = "Sinan",
            LastName = "Fen",
            EmailConfirmed = true,
            PhoneNumberConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString()
        };

        initUser.PasswordHash = CreatePasswordHash(initUser, "sinanfen");

        b.HasData(initUser);

    }

    private string CreatePasswordHash(User user, string password)
    {
        var passwordHasher = new PasswordHasher<User>();
        return passwordHasher.HashPassword(user, password);
    }
}
