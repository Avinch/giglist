using Giglist.Api.Mappers;
using Giglist.Api.Repositories.Interfaces;
using MediatR;

namespace Giglist.Api.Commands.Handlers;

public class AddEventHandler : IRequestHandler<AddEventCommand, IResult>
{
    private readonly IEventRepository _repo;
    private readonly IAddEventCommandToEventMapper _mapper;

    public AddEventHandler(IEventRepository repo, IAddEventCommandToEventMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    
    public async Task<IResult> Handle(AddEventCommand request, CancellationToken cancellationToken)
    {
        var mapped = _mapper.Map(request);

        var result = await _repo.AddEvent(mapped);

        return Results.Ok(result);
    }
}