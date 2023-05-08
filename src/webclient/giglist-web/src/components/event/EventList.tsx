import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import EventService from "../../services/EventService";
import EventDto from "../../models/IEventDto";
import EventCard from "./EventCard";
import { SimpleGrid } from "@mantine/core";

export default function EventList() {
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
        <SimpleGrid cols={5} spacing={"xl"}>
          {(data as EventDto[]).map((item) => (
            <EventCard event={item} />
          ))}
        </SimpleGrid>
      </>
    );
  }

  return null;
}
