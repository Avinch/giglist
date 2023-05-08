import {
  Modal,
  Button,
  TextInput,
  Autocomplete,
  Group,
  Text,
  Select,
} from "@mantine/core";
import EventList from "../components/event/EventList";
import { forwardRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import VenueService from "../services/VenueService";
import { useAuth0 } from "@auth0/auth0-react";
import VenueDto from "../models/IVenueDto";

interface VenueSelectListItem extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  venue: VenueDto;
  label: string;
}

function Events() {
  const [newEventModalOpen, { open, close }] = useDisclosure(false);

  const venueService = new VenueService();
  const { getAccessTokenSilently } = useAuth0();

  const [venueList, setVenueList] = useState<VenueSelectListItem[]>([]);

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
        <Button onClick={() => open()}>New Event</Button>
        <h1>Upcoming Events</h1>
        <EventList />
        <h1>Upcoming Events</h1>
        <EventList />
      </div>
    </>
  );
}

export default Events;
