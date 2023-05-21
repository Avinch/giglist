using Giglist.Api.Extensions;

namespace Giglist.Api.Models;

public class Venue
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string City { get; set; }
    
    public List<Event> Events { get; set; }

    public string SearchName { get; set; }
}