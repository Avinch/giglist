import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import GetForecastResult from "../../models/responses/GetForecastResult";
import AuthTestService from "../../services/authTestService";
import IForecast from "../../models/IForecast";

function ForecastList() {
  const service = new AuthTestService();
  const { getAccessTokenSilently } = useAuth0();

  const [data, setData] = useState(null as GetForecastResult | unknown);

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently();
      const returned = await service.getWeather(token);

      setData(returned);
    };

    getData();
  }, []);

  if (data) {
    console.log(data);
    return (
      <ul>
        {(data as GetForecastResult).forecasts.map((item) => (
          <li>{item.summary}</li>
        ))}
      </ul>
    );
  }

  return null;
}

export default ForecastList;
