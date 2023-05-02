using Giglist.Api.Models;
using Giglist.Api.Repositories.Interfaces;

namespace Giglist.Api.Repositories;

public class MockEventRepository : IEventRepository
{
    private readonly IList<Event> _events;
    
    public MockEventRepository()
    {
        _events = new List<Event>();
        SetupMockData();
    }
    
    public async Task<IEnumerable<Event>> GetAllEvents()
    {
        return _events;
    }

    public async Task<Event?> GetEventById(int id)
    {
        return _events.SingleOrDefault(x => x.Id == id);
    }

    public async Task<Event> AddEvent(Event model)
    {
        var newId = _events.Max(x => x.Id) + 1;

        model.Id = newId;

        _events.Add(model);
        
        return model;
    }

    private void SetupMockData()
    {
        _events.Add(new Event()
        {
            Id = 1,
            Name = "Event 1",
            StartDate = DateTime.Today
        });
        
        _events.Add(new Event()
        {
            Id = 2,
            Name = "Event 2",
            StartDate = DateTime.Today.AddDays(-1)
        });
    }
}