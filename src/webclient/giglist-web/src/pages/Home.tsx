import {
  Modal,
  Button,
  TextInput,
  Autocomplete,
  Group,
  Text,
  Select,
  LoadingOverlay,
  Loader,
} from "@mantine/core";
import EventList from "../components/event/EventList";
import { forwardRef, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import VenueService from "../services/VenueService";
import { useAuth0 } from "@auth0/auth0-react";
import VenueDto from "../models/IVenueDto";
import EventService from "../services/EventService";
import EventDto from "../models/IEventDto";

interface VenueSelectListItem extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  venue: VenueDto;
  label: string;
}

function Events() {
  const [newEventModalOpen, { open, close }] = useDisclosure(false);

  const venueService = new VenueService();
  const eventService = new EventService();
  const { getAccessTokenSilently } = useAuth0();

  const [venueList, setVenueList] = useState<VenueSelectListItem[]>([]);

  const [eventsLoading, setEventsLoading] = useState(true);
  const [pastEvents, setPastEvents] = useState<EventDto[]>([]);
  const [futureEvents, setFutureEvents] = useState<EventDto[]>([]);

  const onVenueNameChange = async (value: string) => {
    var auth = await getAccessTokenSilently();
    var list = await venueService.searchVenues(auth, value);
    let array = [] as VenueSelectListItem[];
    list?.forEach((venue) => {
      let selectItem = {
        venue: venue,
        label: venue.name,
        value: venue.venueId,
      } as VenueSelectListItem;

      array.push(selectItem);
    });
    setVenueList(array);
    console.log("venues", array);
  };

  const getEvents = async () => {
    setEventsLoading(true);
    const token = await getAccessTokenSilently();

    const past = await eventService.getEvents(token, "past");
    const future = await eventService.getEvents(token, "future");

    setPastEvents(past ?? []);
    setFutureEvents(future ?? []);
    setEventsLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const valueItem = forwardRef<HTMLDivElement, VenueSelectListItem>(
    ({ value, venue, ...others }: VenueSelectListItem, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text>{venue.name}</Text>
            <Text size="xs" color="dimmed">
              {venue.city}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  return (
    <>
      <Modal
        opened={newEventModalOpen}
        onClose={() => close()}
        title="New Event"
        centered
      >
        <form>
          <TextInput withAsterisk label="Name"></TextInput>
          <TextInput withAsterisk label="Subtitle"></TextInput>
          <Select
            label="Venue"
            placeholder="Pick one"
            data={venueList}
            onSearchChange={(value) => {
              if (value) {
                onVenueNameChange(value);
              }
            }}
            searchable
            nothingFound="No Venues Found"
            itemComponent={valueItem}
            limit={3}
            clearable
            filter={(value, item) => true}
          ></Select>
          <Button type="submit">Submit</Button>
        </form>
      </Modal>

      <div>
        {eventsLoading ? (
          <Loader />
        ) : (
          <>
            <Button onClick={() => open()}>New Event</Button>
            <h1>Upcoming Events</h1>
            <EventList events={futureEvents} />
            <h1>Past Events</h1>
            <EventList events={pastEvents} />
          </>
        )}
      </div>
    </>
  );
}

export default Events;
