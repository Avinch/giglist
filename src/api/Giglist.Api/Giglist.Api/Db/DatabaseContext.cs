using Giglist.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Giglist.Api.Db;

public class DatabaseContext : DbContext
{
    private readonly IOptions<DbOptions> _options;
    private readonly IConfiguration _config;

    public DatabaseContext(IOptions<DbOptions> options, IConfiguration config)
    {
        _options = options;
        _config = config;
    }
    
    public DbSet<Event> Events { get; set; }
    public DbSet<Venue> Venues { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var cs = _config.GetSection("Db")["ConnectionString"];
        optionsBuilder.UseNpgsql(cs);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        AddSeedData(modelBuilder);
    }

    private void AddSeedData(ModelBuilder builder)
    {
        var fdGuid = Guid.Parse("f7908ef4-89fb-4822-b984-86869f4e45ee");
        var o2LeedsGuid = Guid.Parse("42fc5d09-0e5b-4073-a58c-5a68ef47173e");
        var o2LondonGuid = Guid.Parse("12bb42c3-94b0-49c6-919d-53a3ace9d7ac");
        var nchGuid = Guid.Parse("fa73c367-a28e-4548-a427-8186a2b7b0d3");
        
        builder.Entity<Venue>().HasData(new List<Venue>(){
            new Venue()
            {
                Name = "First Direct Arena",
                City = "Leeds",
                Id = fdGuid,
                SearchName = "firstdirectarena"
            },
            new Venue()
            {
                Name = "O2 Academy Leeds",
                City = "Leeds",
                Id = o2LeedsGuid,
                SearchName = "o2academyleeds"
            },
            new Venue()
            {
                Name = "O2 Arena",
                City = "London",
                Id = o2LondonGuid,
                SearchName = "o2arena"
            },
            new Venue()
            {
                Name = "New Century Hall",
                City = "Manchester",
                Id = nchGuid,
                SearchName = "newcenturyhall"
            }
        });

        builder.Entity<Event>().HasData(new List<Event>()
        {
            new Event()
            {
                Id = Guid.NewGuid(),
                Name = "Ev 1",
                Subtitle = "One",
                StartDate = new DateTime(2023, 1, 1).ToUniversalTime(),
                VenueId = fdGuid
            },
            new Event()
            {
                Id = Guid.NewGuid(),
                Name = "Ev 2",
                Subtitle = "Two",
                StartDate = new DateTime(2023, 1, 2).ToUniversalTime(),
                VenueId = nchGuid
            },

            new Event()
            {
                Id = Guid.NewGuid(),
                Name = "Ev 3",
                Subtitle = "Three",
                StartDate = new DateTime(2023, 1, 3).ToUniversalTime(),
                VenueId = o2LeedsGuid
            },


            new Event()
            {
                Id = Guid.NewGuid(),
                Name = "Ev 4",
                Subtitle = "Four",
                StartDate = new DateTime(2023, 1, 4).ToUniversalTime(),
                VenueId = o2LondonGuid
            },
        });
    }
}

public class DbOptions
{
    public string ConnectionString { get; set; }
}