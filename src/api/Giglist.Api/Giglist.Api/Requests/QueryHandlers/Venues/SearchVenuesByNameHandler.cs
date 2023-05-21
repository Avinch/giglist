using Giglist.Api.Mappers;
using Giglist.Api.Repositories.Interfaces;
using Giglist.Api.Requests.Queries.Venues;
using MediatR;

namespace Giglist.Api.Requests.QueryHandlers.Venues;

public class SearchVenuesByNameHandler : IRequestHandler<SearchVenuesByNameQuery, IResult>
{
    private readonly IVenueRepository _repo;
    private readonly IVenueToDtoMapper _mapper;

    public SearchVenuesByNameHandler(IVenueRepository repo, IVenueToDtoMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    
    public async Task<IResult> Handle(SearchVenuesByNameQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.SearchByName(request.Name);

        if (!result.Any()) return Results.NotFound();

        var mapped = result.Select(ve => _mapper.Map(ve));

        return Results.Ok(mapped);
    }
}