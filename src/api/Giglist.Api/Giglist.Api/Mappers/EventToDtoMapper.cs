using Giglist.Api.Models;
using Giglist.Api.Models.Dto;

namespace Giglist.Api.Mappers;

public class EventToDtoMapper : IEventToDtoMapper
{
    public EventDto Map(Event input)
    {
        return new EventDto()
        {
            Id = input.Id,
            Name = input.Name,
            Start = input.StartDate,
            Subtitle = input.Subtitle
        };
    }
}

public interface IEventToDtoMapper : IMap<Event, EventDto>
{
    
}