namespace Giglist.Api.Mappers;

public interface IMap<TInput, TOutput>
{
    TOutput Map(TInput input);
}