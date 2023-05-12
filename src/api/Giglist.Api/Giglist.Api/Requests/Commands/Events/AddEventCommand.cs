using Giglist.Api.Requests.Queries;

namespace Giglist.Api.Requests.Commands.Events;

public class AddEventCommand : IHttpRequest
{
    public string Name { get; set; }
    public string Subtitle { get; set; }
    public DateTime Start { get; set; }
}