using Giglist.Api.Mappers;
using Giglist.Api.Repositories;
using Giglist.Api.Repositories.Interfaces;

namespace Giglist.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IEventRepository, EventRepository>();
        services.AddScoped<IVenueRepository, VenueRepository>();

        return services;
    }

    public static IServiceCollection AddMappers(this IServiceCollection services)
    {
        services.AddScoped<IEventToDtoMapper, EventToDtoMapper>();
        services.AddScoped<IAddEventCommandToEventMapper, AddEventCommandToEventMapper>();

        services.AddScoped<IVenueToDtoMapper, VenueToDtoMapper>();
        
        return services;
    }
}