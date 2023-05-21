namespace Giglist.Api.Requests.Queries.Venues;

public class GetVenueByIdQuery : IHttpRequest
{
    public Guid Id { get; set; }
}