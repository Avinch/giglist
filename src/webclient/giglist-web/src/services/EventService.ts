import axios from "axios";
import EventDto from "../models/IEventDto";
import config from "../config";

class EventService {
  baseUrl: string = config.apiEndpoint;

  async getEvents(
    authToken: string,
    group: string = ""
  ): Promise<EventDto[] | undefined> {
    return await this.get<EventDto[]>(`event/${group}`, authToken);
  }

  async getEvent(authToken: string, id: string): Promise<EventDto | undefined> {
    return await this.get<EventDto>(`event/${id}`, authToken);
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

export default EventService;
