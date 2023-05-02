using Giglist.Api.Queries;
using MediatR;

namespace Giglist.Api.Extensions;

public static class MediatrMinimalExtensions
{
    public static RouteHandlerBuilder MediateGet<TRequest>(this WebApplication app, string template)
        where TRequest : IHttpRequest
    {
        return app.MapGet(template,
            async (IMediator mediator, [AsParameters] TRequest request) => 
                await mediator.Send(request));
    }
    
    public static RouteHandlerBuilder MediatePost<TRequest>(this WebApplication app, string template)
        where TRequest : IHttpRequest
    {
        return app.MapPost(template,
            async (IMediator mediator, TRequest request) => 
                await mediator.Send(request));
    }
}