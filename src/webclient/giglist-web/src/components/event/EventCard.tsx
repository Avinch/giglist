import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  createStyles,
  UnstyledButton,
} from "@mantine/core";
import IEventDto from "../../models/IEventDto";
import { Link, useNavigate } from "react-router-dom";

interface EventCardProps {
  event: IEventDto;
}

const cardStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function EventCard(props: EventCardProps) {
  const { classes } = cardStyles();
  const navigate = useNavigate();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
      onClick={() => {
        navigate(`/event/${props.event.id}`);
      }}
    >
      <Card.Section>
        <Image
          src="https://pbs.twimg.com/media/FuUWStRWwAAluye?format=jpg&name=medium"
          height="200"
          fit="cover"
        ></Image>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={600}>{props.event.name}</Text>
        <Badge variant="light">12/34/2022</Badge>
      </Group>

      <Group mb="xs">
        <Text weight={500}>{props.event.subtitle}</Text>
      </Group>
    </Card>
  );
}
