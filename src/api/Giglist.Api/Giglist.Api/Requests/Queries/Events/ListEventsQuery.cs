using System.Diagnostics.CodeAnalysis;

namespace Giglist.Api.Requests.Queries.Events;

public class ListEventsQuery : IHttpRequest
{
    public string? Query { get; set; }
}

public enum ListEventQueries
{
    
    Future,
    Past,
    All
}