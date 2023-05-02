using Giglist.Api.Queries;

namespace Giglist.Api.Commands;

public class AddEventCommand : IHttpRequest
{
    public string Name { get; set; }
    public string Subtitle { get; set; }
    public DateTime Start { get; set; }
}