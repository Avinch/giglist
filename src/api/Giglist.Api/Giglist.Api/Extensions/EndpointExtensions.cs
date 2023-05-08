using Giglist.Api.Commands;
using Giglist.Api.Queries;
using Microsoft.AspNetCore.Authorization;

namespace Giglist.Api.Extensions;

public static class EndpointExtensions
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
        app.MediateGet<GetAllEventsQuery>("events").RequireAuthorization(AuthorizationPolicies.RequireBasicAuth);
        app.MediateGet<GetAllEventsQuery>("events/future").RequireAuthorization(AuthorizationPolicies.RequireBasicAuth);
        app.MediateGet<GetAllEventsQuery>("events/past").RequireAuthorization(AuthorizationPolicies.RequireBasicAuth);
        app.MediateGet<GetEventByIdQuery>("event/{id}");
        
        app.MediatePost<AddEventCommand>("event").RequireAuthorization(AuthorizationPolicies.RequireBasicAuth);

        return app;
    }
    
    public static WebApplication AddVenueEndpoints(this WebApplication app)
    {
        app.MediateGet<GetAllVenuesQuery>("venues").RequireAuthorization(AuthorizationPolicies.RequireBasicAuth);
        app.MediateGet<SearchVenuesByNameQuery>("venues/search").RequireAuthorization(AuthorizationPolicies.RequireBasicAuth);
        
        return app;
    }
}