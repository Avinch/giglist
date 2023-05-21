using Giglist.Api.Models;
using Giglist.Api.Models.Dto;

namespace Giglist.Api.Repositories.Interfaces;

public interface IVenueRepository
{ 
    Task<IEnumerable<Venue>> SearchByName(string name);
    Task<IEnumerable<Venue>> GetAll();
    Task<Venue?> GetById(Guid id);
}