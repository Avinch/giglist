namespace Giglist.Api.Extensions;

public static class StringExtensions
{
    public static string ToSearchString(this string value)
    {
        return value.Replace(" ", "").ToLowerInvariant();
    }
}