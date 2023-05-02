import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import EventService from "../../services/EventService";
import EventDto from "../../models/IEventDto";
import EventCard from "./EventCard";
import { Grid } from "@nextui-org/react";

function EventList() {
  const service = new EventService();
  const { getAccessTokenSilently } = useAuth0();

  const [data, setData] = useState(null as EventDto[] | unknown);

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently();
      const returned = await service.getEvents(token);

      setData(returned);
    };

    getData();
  }, []);

  if (data) {
    console.log(data);
    return (
      <>
        <Grid.Container gap={2}>
          {(data as EventDto[]).map((item) => (
            <Grid sm={3}>
              <EventCard event={item} />
            </Grid>
          ))}
        </Grid.Container>
        <ul></ul>
      </>
    );
  }

  return null;
}

export default EventList;
