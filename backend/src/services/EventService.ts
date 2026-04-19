import { Event, EventStatus, EventCategory } from '../models/Event';
import { Venue } from '../models/Venue';
import { Seat, SeatType } from '../models/Seat';
import { TicketType, TicketCategory } from '../models/TicketType';
import { Logger } from '../patterns/singleton/Logger';

const logger = Logger.getInstance();

export class EventService {
  private events: Event[] = [];
  private venues: Venue[] = [];
  private seats: Seat[] = [];
  private ticketTypes: TicketType[] = [];

  async createEvent(
    organizerId: string,
    venueId: string,
    title: string,
    description: string,
    category: EventCategory,
    startTime: Date,
    endTime: Date,
    basePrice: number,
    maxAttendees: number
  ): Promise<Event> {
    const event = new Event(
      organizerId,
      venueId,
      title,
      description,
      category,
      startTime,
      endTime,
      basePrice,
      maxAttendees
    );

    this.events.push(event);
    logger.info(`Event created: ${title}`, 'EventService');

    return event;
  }

  async getEventById(eventId: string): Promise<Event | null> {
    return this.events.find(e => e.getId() === eventId) || null;
  }

  async getAllEvents(): Promise<Event[]> {
    return this.events;
  }

  async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
    return this.events.filter(e => e.getOrganizerId() === organizerId);
  }

  async publishEvent(eventId: string): Promise<Event | null> {
    const event = await this.getEventById(eventId);
    if (event) {
      event.publish();
      logger.info(`Event published: ${event.getTitle()}`, 'EventService');
    }
    return event;
  }

  async cancelEvent(eventId: string): Promise<Event | null> {
    const event = await this.getEventById(eventId);
    if (event) {
      event.cancel();
      logger.info(`Event cancelled: ${event.getTitle()}`, 'EventService');
    }
    return event;
  }

  async createVenue(
    name: string,
    address: string,
    city: string,
    country: string,
    totalCapacity: number
  ): Promise<Venue> {
    const venue = new Venue(name, address, city, country, totalCapacity);
    this.venues.push(venue);
    logger.info(`Venue created: ${name}`, 'EventService');
    return venue;
  }

  async getVenueById(venueId: string): Promise<Venue | null> {
    return this.venues.find(v => v.getId() === venueId) || null;
  }

  async createSeatsForVenue(
    venueId: string,
    rows: number,
    seatsPerRow: number,
    seatType: SeatType = SeatType.GENERAL
  ): Promise<Seat[]> {
    const seats: Seat[] = [];

    for (let row = 0; row < rows; row++) {
      const rowLetter = String.fromCharCode(65 + row);
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const seat = new Seat(
          venueId,
          `${seatNum}`,
          rowLetter,
          'A',
          seatType
        );
        seats.push(seat);
        this.seats.push(seat);
      }
    }

    logger.info(`Created ${seats.length} seats for venue`, 'EventService');
    return seats;
  }

  async getAvailableSeats(venueId: string): Promise<Seat[]> {
    return this.seats.filter(s => s.getVenueId() === venueId && s.isAvailable());
  }

  async createTicketType(
    eventId: string,
    name: string,
    description: string,
    price: number,
    quantityAvailable: number,
    category: TicketCategory
  ): Promise<TicketType> {
    const ticketType = new TicketType(eventId, name, description, price, quantityAvailable, category);
    this.ticketTypes.push(ticketType);
    logger.info(`Ticket type created: ${name}`, 'EventService');
    return ticketType;
  }

  async getTicketTypesByEvent(eventId: string): Promise<TicketType[]> {
    return this.ticketTypes.filter(t => t.getEventId() === eventId);
  }
}
