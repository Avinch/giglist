import axios from "axios";
import EventDto from "../models/IEventDto";
import config from "../config";

class EventService {
  baseUrl: string = config.apiEndpoint;

  async listEvents(
    authToken: string,
    query: "all" | "future" | "past" = "all"
  ): Promise<EventDto[] | undefined> {
    return await this.get<EventDto[]>(`event?query=${query}`, authToken);
  }

  async getEvent(authToken: string, id: string): Promise<EventDto | undefined> {
    return await this.get<EventDto>(`event/${id}`, authToken);
  }

  async insertEvent(authToken: string, body: any): Promise<boolean> {
    return await this.post(`event`, authToken, body);
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

  async post(endpoint: string, token: string, body: any): Promise<boolean> {
    try {
      const { status } = await axios.post(`${this.baseUrl}/${endpoint}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return false;
  }
}

export default EventService;
