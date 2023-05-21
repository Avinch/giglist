namespace Giglist.Api.Requests.Queries.Venues;

public class SearchVenuesByNameQuery : IHttpRequest
{
    public string? Name { get; set; }
}