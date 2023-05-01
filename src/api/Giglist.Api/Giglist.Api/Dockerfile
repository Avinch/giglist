FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Giglist.Api/Giglist.Api.csproj", "Giglist.Api/"]
RUN dotnet restore "Giglist.Api/Giglist.Api.csproj"
COPY . .
WORKDIR "/src/Giglist.Api"
RUN dotnet build "Giglist.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Giglist.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Giglist.Api.dll"]
