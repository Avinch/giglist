import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EventDto from "../models/IEventDto";
import { useAuth0 } from "@auth0/auth0-react";
import EventService from "../services/EventService";
import { Loader, LoadingOverlay } from "@mantine/core";
import VenueDto from "../models/IVenueDto";
import VenueService from "../services/VenueService";

export default function EventPage() {
  const [event, setEvent] = useState<EventDto>();
  const [venue, setVenue] = useState<VenueDto>();
  const [loading, setLoading] = useState(true);
  const { eventId } = useParams();
  const eventService = new EventService();
  const venueService = new VenueService();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently();

      if (eventId) {
        const returned = await eventService.getEvent(token, eventId);
        setEvent(returned);

        if (returned) {
          const venue = await venueService.getVenue(
            token,
            returned.venue.venueId
          );
          setVenue(venue);
        }

        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {event ? (
        <div>
          <h3>
            {event.name} {event.subtitle && <>({event.subtitle})</>}
          </h3>
          <h5>{venue?.name}</h5>
        </div>
      ) : (
        <h3>Error</h3>
      )}
    </div>
  );
}
