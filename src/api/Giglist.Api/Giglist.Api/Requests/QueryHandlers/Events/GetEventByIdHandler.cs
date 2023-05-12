using Giglist.Api.Mappers;
using Giglist.Api.Repositories.Interfaces;
using Giglist.Api.Requests.Queries.Events;
using MediatR;

namespace Giglist.Api.Requests.QueryHandlers.Events;

public class GetEventByIdHandler : IRequestHandler<GetEventByIdQuery, IResult>
{    
    private readonly IEventRepository _repo;
    private readonly IEventToDtoMapper _mapper;

    public GetEventByIdHandler(IEventRepository repo, IEventToDtoMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IResult> Handle(GetEventByIdQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.GetEventById(request.Id);

        if (result == null)
        {
            return Results.NotFound();
        }

        var dto = _mapper.Map(result);
        
        return Results.Ok(dto);
    }
}