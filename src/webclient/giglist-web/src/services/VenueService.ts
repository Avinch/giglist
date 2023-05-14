import axios from "axios";
import VenueDto from "../models/IVenueDto";
import config from "../config";

export default class VenueService {
  baseUrl: string = config.apiEndpoint;

  async searchVenues(
    authToken: string,
    name: string
  ): Promise<VenueDto[] | undefined> {
    return await this.get<VenueDto[]>(`venue/search?name=${name}`, authToken);
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
    } catch (err) {
      console.log(err);
    }
  }
}
