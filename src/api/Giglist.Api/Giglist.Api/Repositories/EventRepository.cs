using Giglist.Api.Db;
using Giglist.Api.Models;
using Giglist.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Giglist.Api.Repositories;

public class EventRepository : IEventRepository
{
    private readonly DatabaseContext _db;

    public EventRepository(DatabaseContext db)
    {
        _db = db;
    }
    
    public async Task<IEnumerable<Event>> GetAllEvents()
    {
        return await _db.Events.ToListAsync();
    }

    public async Task<Event?> GetEventById(Guid id)
    {
        return await _db.Events.SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Event> AddEvent(Event model)
    {
        var newId = Guid.NewGuid();

        model.Id = newId;

        await _db.Events.AddAsync(model);
        await _db.SaveChangesAsync();
        
        return model;
    }

    public async Task<IEnumerable<Event>> GetPastEvents()
    {
        return await _db.Events.Where(x => x.StartDate.Date < DateTime.UtcNow.Date).ToListAsync();
    }
    
    public async Task<IEnumerable<Event>> GetFutureEvents()
    {
        return await _db.Events.Where(x => x.StartDate.Date >= DateTime.UtcNow.Date).ToListAsync();
    }
}