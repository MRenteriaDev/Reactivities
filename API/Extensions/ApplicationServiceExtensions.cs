using System;
using Application.Activities;
using Application.core;
using Application.Interfaces;
using Infraestructure.Photos;
using Infraestructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddDbContext<DataContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                // Depending on if in development or production, use either Heroku-provided
                // connection string, or development connection string from env var.
                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    // Use connection string provided at runtime by Heroku.
                    //var connUrl = Environment.GetEnvironmentVariable("postgres://sopyajrmdubztj:d53df27f9c64738b61301213acbe079d8c995554dee97ad4993281afa45a522f@ec2-34-239-34-246.compute-1.amazonaws.com:5432/d6da4ohsutegmn");

                    // Parse connection URL to connection string for Npgsql
                    //connUrl = connUrl.Replace("postgres://", string.Empty);
                    //var pgUserPass = connUrl.Split("@")[0];
                    //var pgHostPortDb = connUrl.Split("@")[1];
                    //var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = Environment.GetEnvironmentVariable("d6da4ohsutegmn");
                    var pgUser = Environment.GetEnvironmentVariable("sopyajrmdubztj");
                    var pgPass = Environment.GetEnvironmentVariable("d53df27f9c64738b61301213acbe079d8c995554dee97ad4993281afa45a522f");
                    var pgHost = Environment.GetEnvironmentVariable("ec2-34-239-34-246.compute-1.amazonaws.com");
                    var pgPort = Environment.GetEnvironmentVariable("5432");

                    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
                }

                // Whether the connection string came from the local development configuration file
                // or from the environment variable from Heroku, use it to set up your DbContext.
                options.UseNpgsql(connStr);
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddSignalR();

            return services;
        }
    }
}