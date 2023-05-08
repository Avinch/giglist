using Giglist.Api.Models;
using Giglist.Api.Models.Dto;

namespace Giglist.Api.Mappers;

public class VenueToDtoMapper : IVenueToDtoMapper
{
    public VenueDto Map(Venue input)
    {
        return new VenueDto()
        {
            Id = input.Id,
            Name = input.Name,
            City = input.City
        };
    }
}

public interface IVenueToDtoMapper : IMap<Venue, VenueDto>
{
    
}