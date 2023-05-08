namespace Giglist.Api.Queries;

public class SearchVenuesByNameQuery : IHttpRequest
{
    public string? Name { get; set; }
}