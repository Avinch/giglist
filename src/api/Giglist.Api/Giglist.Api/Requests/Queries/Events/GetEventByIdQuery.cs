namespace Giglist.Api.Requests.Queries.Events;

public class GetEventByIdQuery : IHttpRequest
{
    public int Id { get; set; }
}