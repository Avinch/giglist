import { Card, Col, Row, Button, Text, Container } from "@nextui-org/react";
import EventList from "../components/event/EventList";

function Home() {
  return (
    <Container>
      <Text size={25} weight="bold">
        Upcoming Events
      </Text>
      <EventList />
      <Text size={25} weight="bold">
        Previous Events
      </Text>
      <EventList />
    </Container>
  );
}

export default Home;
