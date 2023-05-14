using Giglist.Api.Mappers;
using Giglist.Api.Models;
using Giglist.Api.Repositories.Interfaces;
using Giglist.Api.Requests.Queries.Events;
using MediatR;

namespace Giglist.Api.Requests.QueryHandlers.Events;

public class ListEventsHandler : IRequestHandler<ListEventsQuery, IResult>
{
    private readonly IEventRepository _repo;
    private readonly IEventToDtoMapper _mapper;

    public ListEventsHandler(IEventRepository repo, IEventToDtoMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    
    public async Task<IResult> Handle(ListEventsQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Event> events;
        var queryType = ParseQueryName(request.Query);

        switch (queryType)
        {
            case ListEventQueries.Past:
                events = await _repo.GetPastEvents();
                break;
            case ListEventQueries.Future:
                events = await _repo.GetFutureEvents();
                break;
            default:
                events = await _repo.GetAllEvents();
                break;
        }
        
        var dtos = events.Select(ev => _mapper.Map(ev));
        
        return Results.Ok(dtos);
    }

    private ListEventQueries? ParseQueryName(string? query)
    {
        if (Enum.TryParse(query, true, out ListEventQueries value))
        {
            return value;
        }

        return ListEventQueries.All;
    }
}