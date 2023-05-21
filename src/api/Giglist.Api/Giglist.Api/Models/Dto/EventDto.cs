namespace Giglist.Api.Models.Dto;

public class EventDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Subtitle { get; set; }
    public DateTime Start { get; set; }
    public VenueDto? Venue { get; set; }
}