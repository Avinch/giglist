namespace Giglist.Api.Models;

public class Event
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Subtitle { get; set; }
    public DateTime StartDate { get; set; }
    public Venue Venue { get; set; }
    public Guid VenueId { get; set; }
}