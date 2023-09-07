using Business.Abstract;
using Business.Concrete;
using Business.Utilities.Messages;
using DataAccess.Abstract;
using DataAccess.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Extensions;

public static class BusinessServiceRegistration
{
    public static IServiceCollection AddBusinesServices(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<PassBoxDbContext>(options => options.UseSqlServer(connectionString).UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
        services.AddIdentity<User, Role>(options =>
        {
            //User password options
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 5;
            options.Password.RequiredUniqueChars = 0; //En az kaç tane birbirinden farklı özel karakter?(eğer 2 ise @ ve ! gibi 2 tane şart)
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            //User username and email options
            options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+$";
            options.User.RequireUniqueEmail = true;
        }).AddEntityFrameworkStores<PassBoxDbContext>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IBoxService, BoxManager>();

        // BoxMessages hizmet kaydı
        services.AddScoped<BoxMessages>();

        // UserMessages hizmet kaydı
        services.AddScoped<UserMessages>();

        return services;
    }
   
}
