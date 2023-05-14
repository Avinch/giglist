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
  SimpleGrid,
} from "@mantine/core";
import EventList from "../components/event/EventList";
import { ChangeEvent, FormEvent, forwardRef, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import VenueService from "../services/VenueService";
import { useAuth0 } from "@auth0/auth0-react";
import VenueDto from "../models/IVenueDto";
import EventService from "../services/EventService";
import EventDto from "../models/IEventDto";
import { DatePickerInput, DateValue } from "@mantine/dates";

interface VenueSelectListItem extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  venue: VenueDto;
  label: string;
}

interface NewEventSubmitDetails {
  name: string;
  venue: string;
  subitle: string;
  start: Date;
}

function Events() {
  const [newEventModalOpen, { open, close }] = useDisclosure(false);
  const [newEventFormState, setNewEventFormState] = useState(
    {} as NewEventSubmitDetails
  );

  const [forceLoadEvents, setForceLoadEvents] = useState(1); // surely better way of doing this?

  const handleNewEventSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit:", newEventFormState);
    let token = await getAccessTokenSilently();
    eventService.insertEvent(token, newEventFormState);
    close();
    setForceLoadEvents(forceLoadEvents + 1);
  };

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
  };

  const onVenueSelect = (value: string | null) => {
    if (value === null) return;

    console.log("venue change", {
      value: value,
    });

    setNewEventFormState((prev) => ({
      ...prev,
      venue: value,
    }));
  };

  function onTextFormChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    console.log("text change", {
      inputName: name,
      value: value,
    });

    setNewEventFormState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  }

  useEffect(() => {
    const getEvents = async () => {
      setEventsLoading(true);
      const token = await getAccessTokenSilently();

      const past = await eventService.getEvents(token, "past");
      const future = await eventService.getEvents(token, "future");

      setPastEvents(past ?? []);
      setFutureEvents(future ?? []);
      setEventsLoading(false);
    };

    getEvents();
  }, [forceLoadEvents]);

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

  function onDatePickerChange(value: DateValue): void {
    if (value === null) return;

    console.log("date change", {
      value: value,
    });

    setNewEventFormState((prev) => ({
      ...prev,
      start: value,
    }));
  }

  return (
    <>
      <Modal
        opened={newEventModalOpen}
        onClose={() => close()}
        title="New Event"
        centered
      >
        <form onSubmit={handleNewEventSubmit}>
          <SimpleGrid cols={1} verticalSpacing={"xl"}>
            <TextInput
              withAsterisk
              label="Name"
              name="name"
              onChange={onTextFormChange}
            ></TextInput>
            <TextInput
              withAsterisk
              label="Subtitle"
              name="subtitle"
              onChange={onTextFormChange}
            ></TextInput>
            <Select
              name="venue"
              label="Venue"
              placeholder="Pick one"
              data={venueList}
              onChange={onVenueSelect}
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
              withAsterisk
              filter={(value, item) => true}
            ></Select>
            <DatePickerInput
              onChange={onDatePickerChange}
              name="date"
              label="Date"
              size="xs"
              withAsterisk
            ></DatePickerInput>
            <Button type="submit">Submit</Button>
          </SimpleGrid>
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
