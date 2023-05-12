using Giglist.Api.Models;
using Giglist.Api.Models.Dto;
using Giglist.Api.Requests.Commands.Events;

namespace Giglist.Api.Mappers;

public class AddEventCommandToEventMapper : IAddEventCommandToEventMapper
{
    public Event Map(AddEventCommand input)
    {
        return new Event()
        {
            Name = input.Name,
            StartDate = input.Start,
            Subtitle = input.Subtitle
        };
    }
}

public interface IAddEventCommandToEventMapper : IMap<AddEventCommand, Event>
{
    
}