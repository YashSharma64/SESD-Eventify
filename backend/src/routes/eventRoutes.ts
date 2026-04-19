import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getEvent,
  publishEvent,
  cancelEvent,
  createVenue,
  getVenueSeats,
  createTicketType
} from '../controllers/EventController';
import { authenticate, authorize, validateRequired, validateEventDates, validatePrice } from '../middleware';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEvent);

router.post('/',
  authenticate,
  authorize('organizer', 'admin'),
  validateRequired(['venueId', 'title', 'description', 'category', 'startTime', 'endTime', 'basePrice', 'maxAttendees']),
  validateEventDates,
  validatePrice,
  createEvent
);

router.patch('/:id/publish',
  authenticate,
  authorize('organizer', 'admin'),
  publishEvent
);

router.patch('/:id/cancel',
  authenticate,
  authorize('organizer', 'admin'),
  cancelEvent
);

router.post('/venues',
  authenticate,
  authorize('admin'),
  validateRequired(['name', 'address', 'city', 'country', 'totalCapacity']),
  createVenue
);

router.get('/venues/:venueId/seats', getVenueSeats);

router.post('/ticket-types',
  authenticate,
  authorize('organizer', 'admin'),
  validateRequired(['eventId', 'name', 'description', 'price', 'quantityAvailable', 'category']),
  createTicketType
);

export default router;
