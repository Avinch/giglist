import EventDto from "../../models/IEventDto";
import EventCard from "./EventCard";
import { SimpleGrid } from "@mantine/core";

interface IEventListProps {
  events: EventDto[];
}

export default function EventList(props: IEventListProps) {
  if (props.events) {
    return (
      <>
        <SimpleGrid cols={5} spacing={"xl"}>
          {props.events.map((item) => (
            <EventCard event={item} />
          ))}
        </SimpleGrid>
      </>
    );
  } else {
    return <p>No Events Found</p>;
  }
}
