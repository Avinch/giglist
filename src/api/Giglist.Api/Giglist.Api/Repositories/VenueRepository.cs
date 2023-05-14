using Giglist.Api.Db;
using Giglist.Api.Extensions;
using Giglist.Api.Models;
using Giglist.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Giglist.Api.Repositories;

public class VenueRepository : IVenueRepository
{
    private readonly DatabaseContext _db;

    public VenueRepository(DatabaseContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Venue>> SearchByName(string name)
    {
        return await _db.Venues.Where(x => x.SearchName.Contains(name.ToSearchString())).ToListAsync();
    }

    public async Task<IEnumerable<Venue>> GetAll()
    {
        return await _db.Venues.ToListAsync();
    }

    public async Task<Venue?> GetById(Guid id)
    {
        return await _db.Venues.SingleOrDefaultAsync(x => x.Id == id);
    }
}