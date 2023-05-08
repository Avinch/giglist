import axios from "axios";
import EventDto from "../models/IEventDto";
import VenueDto from "../models/IVenueDto";

export default class VenueService {
  baseUrl: string = "https://localhost:7052";

  async searchVenues(
    authToken: string,
    name: string
  ): Promise<VenueDto[] | undefined> {
    return await this.get<VenueDto[]>(`venues/search?name=${name}`, authToken);
  }

  async get<T>(endpoint: string, token: string) {
    try {
      const { data, status } = await axios.get<T>(
        `${this.baseUrl}/${endpoint}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (status === 200) {
        return data;
      }
    } catch (err) {}
  }
}
