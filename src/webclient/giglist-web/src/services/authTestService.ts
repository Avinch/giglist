import axios from "axios";
import GetForecastResult from "../models/responses/GetForecastResult";

class AuthTestService {
  baseUrl: string = "https://localhost:7052";

  async getWeather(authToken: string): Promise<GetForecastResult | undefined> {
    return await this.get<GetForecastResult>("WeatherForecast", authToken);
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

export default AuthTestService;
