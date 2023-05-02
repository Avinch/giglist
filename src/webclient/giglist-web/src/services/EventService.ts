import axios from "axios";
import EventDto from "../models/IEventDto";

class EventService {
  baseUrl: string = "https://localhost:7052";

  async getEvents(authToken: string): Promise<EventDto[] | undefined> {
    return await this.get<EventDto[]>("events", authToken);
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
