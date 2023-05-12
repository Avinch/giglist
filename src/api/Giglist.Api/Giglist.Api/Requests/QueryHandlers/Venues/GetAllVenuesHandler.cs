using Giglist.Api.Mappers;
using Giglist.Api.Repositories.Interfaces;
using Giglist.Api.Requests.Queries.Venues;
using MediatR;

namespace Giglist.Api.Requests.QueryHandlers.Venues;

public class GetAllVenuesHandler : IRequestHandler<GetAllVenuesQuery, IResult>
{
    private readonly IVenueRepository _repo;
    private readonly IVenueToDtoMapper _mapper;

    public GetAllVenuesHandler(IVenueRepository repo, IVenueToDtoMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    
    public async Task<IResult> Handle(GetAllVenuesQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.GetAll();

        if (!result.Any()) return Results.NotFound();

        var mapped = result.Select(ven => _mapper.Map(ven));

        return Results.Ok(mapped);
    }
}