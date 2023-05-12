using Giglist.Api.Models;

namespace Giglist.Api.Repositories.Interfaces;

public interface IEventRepository
{
    Task<IEnumerable<Event>> GetAllEvents();
    Task<Event?> GetEventById(int id);
    Task<Event> AddEvent(Event model);
    Task<IEnumerable<Event>> GetPastEvents();
    Task<IEnumerable<Event>> GetFutureEvents();
}