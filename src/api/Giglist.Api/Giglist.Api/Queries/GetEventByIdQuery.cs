namespace Giglist.Api.Queries;

public class GetEventByIdQuery : IHttpRequest
{
    public int Id { get; set; }
}