namespace Giglist.Api.Requests.Queries.Events;

public class GetEventByIdQuery : IHttpRequest
{
    public Guid Id { get; set; }
}