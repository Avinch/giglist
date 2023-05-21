using Giglist.Api.Db;
using Giglist.Api.Models;
using Giglist.Api.Models.Dto;
using Giglist.Api.Repositories.Interfaces;
using Giglist.Api.Requests.Queries.Venues;
using MediatR;

namespace Giglist.Api.Requests.QueryHandlers.Venues;

public class GetVenueByIdHandler : IRequestHandler<GetVenueByIdQuery, IResult>
{
    private readonly IVenueRepository _repo;

    public GetVenueByIdHandler(IVenueRepository repo)
    {
        _repo = repo;
    }
    
    public async Task<IResult> Handle(GetVenueByIdQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.GetById(request.Id);

        if (result == null)
        {
            return Results.NotFound();
        }

        var response = MapResponse(result);

        return Results.Ok(response);
    }

    private VenueDto MapResponse(Venue venue)
    {
        return new VenueDto()
        {
            VenueId = venue.Id,
            Name = venue.Name,
            City = venue.City
        };
    }
}