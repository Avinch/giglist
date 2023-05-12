using Giglist.Api.Mappers;
using Giglist.Api.Models.Dto;
using Giglist.Api.Repositories.Interfaces;
using Giglist.Api.Requests.Queries.Events;
using MediatR;

namespace Giglist.Api.Requests.QueryHandlers.Events;

public class GetPastEventsHandler : IRequestHandler<GetPastEventsQuery, IResult>
{
    private readonly IEventRepository _repo;
    private readonly IEventToDtoMapper _mapper;

    public GetPastEventsHandler(IEventRepository repo, IEventToDtoMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    
    public async Task<IResult> Handle(GetPastEventsQuery request, CancellationToken cancellationToken)
    {
        var events = await _repo.GetPastEvents();

        if (!events.Any())
        {
            return Results.Ok(new List<EventDto>());
        }
        
        var mapped = events.Select(x => _mapper.Map(x));
        
        return Results.Ok(mapped);
    }
}