import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import IEventDto from "../../models/IEventDto";

interface EventCardProps {
  event: IEventDto;
}

export default function EventCard(props: EventCardProps) {
  console.log(props.event);
  return (
    <Card css={{ w: "100%", h: "230px" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            {props.event.subtitle}
          </Text>
          <Text h3 color="black">
            {props.event.name}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src="https://pbs.twimg.com/media/FuUWStRWwAAluye?format=jpg&name=medium"
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="#000" size={20}>
              12/12/2022 @ Place
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button flat auto rounded color="secondary">
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  go
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}
