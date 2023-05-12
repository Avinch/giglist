using Giglist.Api.Extensions;
using Giglist.Api.Requests.Commands.Events;
using Giglist.Api.Requests.Queries.Events;
using Giglist.Api.Requests.Queries.Venues;
using Microsoft.AspNetCore.Authorization;

namespace Giglist.Api.Requests;

public static class EndpointRegistrations
{
    private static class AuthorizationPolicies
    {
        public const string RequireBasicAuth = "require_basic_auth";
    }
    
    public static AuthorizationBuilder AddAuthPolicies(this AuthorizationBuilder authBuilder)
    {
        authBuilder.AddPolicy(AuthorizationPolicies.RequireBasicAuth, 
            pol => pol.RequireAuthenticatedUser());
        
        return authBuilder;
    }
    
    public static WebApplication AddEventEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("event")
            .RequireAuthorization(AuthorizationPolicies.RequireBasicAuth);
        
        group.MediateGet<GetAllEventsQuery>("");
        
        group.MediateGet<GetFutureEventsQuery>("future");
        group.MediateGet<GetPastEventsQuery>("past");
        
        group.MediateGet<GetEventByIdQuery>("{id}");
        
        group.MediatePost<AddEventCommand>("");

        return app;
    }
    
    public static WebApplication AddVenueEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("venue")
            .RequireAuthorization(AuthorizationPolicies.RequireBasicAuth);
        
        group.MediateGet<GetAllVenuesQuery>("");
        group.MediateGet<SearchVenuesByNameQuery>("search");
        
        return app;
    }
}