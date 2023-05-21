using System.Collections;
using Giglist.Api.Db;
using Giglist.Api.Mappers;
using Giglist.Api.Models;
using Giglist.Api.Models.Dto;
using Giglist.Api.Repositories.Interfaces;
using Giglist.Api.Requests.Queries.Events;
using MediatR;

namespace Giglist.Api.Requests.QueryHandlers.Events;

public class ListEventsHandler : IRequestHandler<ListEventsQuery, IResult>
{
    private readonly IEventRepository _repo;
    private readonly IEventToDtoMapper _mapper;
    private readonly DatabaseContext _ctx;

    public ListEventsHandler(IEventRepository repo, IEventToDtoMapper mapper, DatabaseContext ctx)
    {
        _repo = repo;
        _mapper = mapper;
        _ctx = ctx;
    }
    
    public async Task<IResult> Handle(ListEventsQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Event> events;
        var queryType = ParseQueryName(request.Query);

        events = queryType switch
        {
            ListEventQueries.Past => await _repo.GetPastEvents(),
            ListEventQueries.Future => await _repo.GetFutureEvents(),
            _ => await _repo.GetAllEvents()
        };

        var response = MapResponse(events);
        
        return Results.Ok(response);
    }

    private ListEventQueries? ParseQueryName(string? query)
    {
        if (Enum.TryParse(query, true, out ListEventQueries value))
        {
            return value;
        }

        return ListEventQueries.All;
    }

    private IEnumerable<EventDto> MapResponse(IEnumerable<Event> events)
    {
        return events.Select(x => new EventDto()
        {
            Id = x.Id,
            Name = x.Name,
            Subtitle = x.Subtitle,
            Start = x.StartDate,
            Venue = new VenueDto()
            {
                Name = x.Venue.Name,
                City = x.Venue.City,
                VenueId = x.Venue.Id
            }
        });
    }
}