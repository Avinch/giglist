import VenueDto from "./IVenueDto";

export default interface EventDto {
  name: string;
  start: Date;
  id: number;
  subtitle: string;
  venue: VenueDto;
}
