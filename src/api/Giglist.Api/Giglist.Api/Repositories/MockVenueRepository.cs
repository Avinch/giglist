using Giglist.Api.Extensions;
using Giglist.Api.Models;
using Giglist.Api.Models.Dto;
using Giglist.Api.Repositories.Interfaces;

namespace Giglist.Api.Repositories;

public class MockVenueRepository : IVenueRepository
{
    private List<Venue> _venues;
    
    public MockVenueRepository()
    {
        _venues = new List<Venue>();
        SetupMockData();
    }

    private void SetupMockData()
    {
        var fdGuid = Guid.Parse("f7908ef4-89fb-4822-b984-86869f4e45ee");
        var o2LeedsGuid = Guid.Parse("42fc5d09-0e5b-4073-a58c-5a68ef47173e");
        var o2LondonGuid = Guid.Parse("12bb42c3-94b0-49c6-919d-53a3ace9d7ac");
        var nchGuid = Guid.Parse("fa73c367-a28e-4548-a427-8186a2b7b0d3");
        
        _venues.AddRange(new []
        {
            new Venue()
            {
                Name = "First Direct Arena",
                City = "Leeds",
                Id = fdGuid
            },
            new Venue()
            {
                Name = "O2 Academy Leeds",
                City = "Leeds",
                Id = o2LeedsGuid
            },
            new Venue()
            {
                Name = "O2 Arena",
                City = "London",
                Id = o2LondonGuid
            },
            new Venue()
            {
                Name = "New Century Hall",
                City = "Manchester",
                Id = nchGuid
            }
        });
    }
    
    public async Task<IEnumerable<Venue>> SearchByName(string name)
    {
        return _venues.Where(x => x.SearchName.Contains(name.ToSearchString()));
    }

    public async Task<IEnumerable<Venue>> GetAll()
    {
        return _venues;
    }
}