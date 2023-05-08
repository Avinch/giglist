using Giglist.Api.Mappers;
using Giglist.Api.Repositories;
using Giglist.Api.Repositories.Interfaces;

namespace Giglist.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddSingleton<IEventRepository, MockEventRepository>();
        services.AddSingleton<IVenueRepository, MockVenueRepository>();

        return services;
    }

    public static IServiceCollection AddMappers(this IServiceCollection services)
    {
        services.AddSingleton<IEventToDtoMapper, EventToDtoMapper>();
        services.AddSingleton<IAddEventCommandToEventMapper, AddEventCommandToEventMapper>();

        services.AddSingleton<IVenueToDtoMapper, VenueToDtoMapper>();
        
        return services;
    }
}