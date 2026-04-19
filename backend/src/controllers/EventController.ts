import { Request, Response } from 'express';
import { EventService } from '../services/EventService';
import { EventCategory } from '../models/Event';
import { SeatType } from '../models/Seat';
import { TicketCategory } from '../models/TicketType';
import { catchAsync } from '../middleware';

const eventService = new EventService();

export const createEvent = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;
  const { venueId, title, description, category, startTime, endTime, basePrice, maxAttendees } = req.body;

  const event = await eventService.createEvent(
    userId,
    venueId,
    title,
    description,
    category as EventCategory,
    new Date(startTime),
    new Date(endTime),
    basePrice,
    maxAttendees
  );

  res.status(201).json({
    status: 'success',
    data: { event: event.toJSON() }
  });
});

export const getEvents = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const events = await eventService.getAllEvents();

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: { events: events.map(e => e.toJSON()) }
  });
});

export const getEvent = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const event = await eventService.getEventById(id);

  if (!event) {
    res.status(404).json({
      status: 'fail',
      message: 'Event not found'
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { event: event.toJSON() }
  });
});

export const publishEvent = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const event = await eventService.publishEvent(id);

  if (!event) {
    res.status(404).json({
      status: 'fail',
      message: 'Event not found'
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { event: event.toJSON() }
  });
});

export const cancelEvent = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const event = await eventService.cancelEvent(id);

  if (!event) {
    res.status(404).json({
      status: 'fail',
      message: 'Event not found'
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { event: event.toJSON() }
  });
});

export const createVenue = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { name, address, city, country, totalCapacity } = req.body;

  const venue = await eventService.createVenue(name, address, city, country, totalCapacity);

  res.status(201).json({
    status: 'success',
    data: { venue: venue.toJSON() }
  });
});

export const getVenueSeats = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { venueId } = req.params;
  const seats = await eventService.getAvailableSeats(venueId);

  res.status(200).json({
    status: 'success',
    results: seats.length,
    data: { seats: seats.map(s => s.toJSON()) }
  });
});

export const createTicketType = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { eventId, name, description, price, quantityAvailable, category } = req.body;

  const ticketType = await eventService.createTicketType(
    eventId,
    name,
    description,
    price,
    quantityAvailable,
    category as TicketCategory
  );

  res.status(201).json({
    status: 'success',
    data: { ticketType: ticketType.toJSON() }
  });
});
